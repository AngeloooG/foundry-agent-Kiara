import { mockCases } from "~/data/mockCases";
import type { KnowledgeCase } from "~/types/knowledgeCase";

export interface CasesRepository {
  list(signal?: AbortSignal): Promise<KnowledgeCase[]>;
  getById(id: string, signal?: AbortSignal): Promise<KnowledgeCase | null>;
}

class MockCasesRepository implements CasesRepository {
  async list(signal?: AbortSignal): Promise<KnowledgeCase[]> {
    signal?.throwIfAborted();
    return Promise.resolve(mockCases.map((item) => ({ ...item, technology: [...item.technology] })));
  }

  async getById(id: string, signal?: AbortSignal): Promise<KnowledgeCase | null> {
    signal?.throwIfAborted();
    const item = mockCases.find((candidate) => candidate.id === id);
    return Promise.resolve(item ? { ...item, technology: [...item.technology] } : null);
  }
}

export const casesRepository: CasesRepository = new MockCasesRepository();
