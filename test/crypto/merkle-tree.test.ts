import { MerkleTree } from '@/lib/crypto/merkle-tree';
import { sha256 } from '@/lib/crypto/sha256';

describe('Cryptographic Merkle Tree', () => {
  it('instantiates empty tree with defined hash', async () => {
    const tree = await MerkleTree.create([]);
    expect(tree.getRoot()).toBeDefined(); // Falls back to empty string hash
  });

  it('builds canonical asynchronous trees correctly', async () => {
    const data = ['vote1', 'vote2', 'vote3', 'vote4'];
    const tree = await MerkleTree.create(data);
    
    expect(tree.getRoot().length).toBe(66); // Hex SHA-256 string with 0x prefix
  });

  it('generates valid proofs capable of verifying data mathematically', async () => {
    const data = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'];
    const tree = await MerkleTree.create(data);
    const root = tree.getRoot();

    // Generate proof for index 2 ("Gamma")
    const proof = tree.getProof(2);
    expect(proof).toBeDefined();

    // Validate Cryptographically
    const isValid = await MerkleTree.verify('Gamma', proof, root);
    expect(isValid).toBe(true);
  });

  it('rejects tampered data in proof validation', async () => {
    const data = ['Data1', 'Data2', 'Data3', 'Data4'];
    const tree = await MerkleTree.create(data);
    const root = tree.getRoot();
    
    const proof = tree.getProof(1); // Proof for Data2

    // Tampered Data validation -> Should fail
    const isValid = await MerkleTree.verify('Data999', proof, root);
    expect(isValid).toBe(false);
  });

  it('rejects tampered sibling nodes in the proof payload', async () => {
    const data = ['D1', 'D2', 'D3', 'D4'];
    const tree = await MerkleTree.create(data);
    const proof = tree.getProof(0);
    const root = tree.getRoot();

    // Tamper the proof structure
    proof[0].data = await sha256('TAMPERED');

    const isValid = await MerkleTree.verify('D1', proof, root);
    expect(isValid).toBe(false);
  });
});
