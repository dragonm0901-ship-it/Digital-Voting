/**
 * Merkle Tree Implementation for Voting Batch Verification
 *
 * Uses real SHA-256 hashing via the Web Crypto API.
 * Batches thousands of votes into single block hashes while
 * providing individual "Inclusion Proofs" for voter receipts.
 *
 * Since crypto.subtle.digest is async, the tree must be constructed
 * via the static factory method: `await MerkleTree.create(leaves)`
 */

import { sha256 } from './sha256';

export interface MerkleProofNode {
  position: 'left' | 'right';
  data: string;
}

export class MerkleTree {
  private leaves: string[] = [];
  private layers: string[][] = [];

  /**
   * Private constructor — use MerkleTree.create() instead.
   */
  private constructor(hashedLeaves: string[], layers: string[][]) {
    this.leaves = hashedLeaves;
    this.layers = layers;
  }

  /**
   * Async factory: creates a MerkleTree from raw leaf strings.
   * Each leaf is SHA-256 hashed, then the tree is built bottom-up.
   *
   * @example
   *   const tree = await MerkleTree.create(['vote1', 'vote2', 'vote3']);
   *   const root = tree.getRoot(); // "0xabc123..."
   */
  static async create(leaves: string[]): Promise<MerkleTree> {
    if (leaves.length === 0) {
      return new MerkleTree([], [['0x0']]);
    }

    // Hash all leaves
    const hashedLeaves = await Promise.all(
      leaves.map(leaf => sha256(leaf))
    );

    // Build tree layers bottom-up
    const layers: string[][] = [hashedLeaves];
    let currentLayer = hashedLeaves;

    while (currentLayer.length > 1) {
      const nextLayer: string[] = [];
      for (let i = 0; i < currentLayer.length; i += 2) {
        const left = currentLayer[i];
        const right = currentLayer[i + 1] || left; // Duplicate last node if odd count
        // Concatenate and hash the pair
        const combined = await sha256(left + right);
        nextLayer.push(combined);
      }
      layers.push(nextLayer);
      currentLayer = nextLayer;
    }

    return new MerkleTree(hashedLeaves, layers);
  }

  /**
   * Returns the Merkle Root hash of the tree.
   * This single hash represents the integrity of all leaves.
   */
  getRoot(): string {
    return this.layers[this.layers.length - 1][0] || '0x0';
  }

  /**
   * Returns the number of leaves in the tree.
   */
  getLeafCount(): number {
    return this.leaves.length;
  }

  /**
   * Returns all layers of the tree (for debugging/visualization).
   */
  getLayers(): string[][] {
    return this.layers;
  }

  /**
   * Generates a Merkle Proof (inclusion proof) for a leaf at a specific index.
   * This proof allows anyone to verify that the leaf is part of the tree
   * without needing the entire tree — only the root hash.
   *
   * @param index The 0-based index of the leaf in the original leaves array
   * @returns Array of sibling hashes with their positions
   */
  getProof(index: number): MerkleProofNode[] {
    if (index < 0 || index >= this.leaves.length) {
      throw new Error(`Leaf index ${index} out of bounds (0..${this.leaves.length - 1})`);
    }

    const proof: MerkleProofNode[] = [];
    let currentIndex = index;

    for (let i = 0; i < this.layers.length - 1; i++) {
      const layer = this.layers[i];
      const isRight = currentIndex % 2 === 1;
      const pairIndex = isRight ? currentIndex - 1 : currentIndex + 1;

      if (pairIndex < layer.length) {
        proof.push({
          position: isRight ? 'left' : 'right',
          data: layer[pairIndex],
        });
      } else {
        // Odd leaf count — this node was duplicated during tree build
        proof.push({
          position: 'right',
          data: layer[currentIndex],
        });
      }
      currentIndex = Math.floor(currentIndex / 2);
    }

    return proof;
  }

  /**
   * Verifies that a raw leaf string is included in a tree with the given root.
   * This is the core of End-to-End Verifiability (E2EV):
   *   - Voter has: their original vote data (leaf) + proof from receipt
   *   - Public has: the Merkle root (published on the ledger)
   *   - Anyone can verify: "Yes, this vote was included in block X"
   *
   * @param leaf    The raw (unhashed) leaf data
   * @param proof   The Merkle proof from getProof()
   * @param root    The expected Merkle root
   * @returns true if the proof is valid
   */
  static async verify(
    leaf: string,
    proof: MerkleProofNode[],
    root: string
  ): Promise<boolean> {
    let currentHash = await sha256(leaf);

    for (const node of proof) {
      if (node.position === 'left') {
        currentHash = await sha256(node.data + currentHash);
      } else {
        currentHash = await sha256(currentHash + node.data);
      }
    }

    return currentHash === root;
  }

  /**
   * Verifies using a pre-hashed leaf (when the original data isn't available,
   * but the hashed leaf from the receipt is).
   */
  static async verifyHashed(
    hashedLeaf: string,
    proof: MerkleProofNode[],
    root: string
  ): Promise<boolean> {
    let currentHash = hashedLeaf;

    for (const node of proof) {
      if (node.position === 'left') {
        currentHash = await sha256(node.data + currentHash);
      } else {
        currentHash = await sha256(currentHash + node.data);
      }
    }

    return currentHash === root;
  }
}
