import { LocalStorageItems } from "../entities/LocalStorage"
import { LocalStorageRepository } from "../repositories/LocalStorageRepository"

export interface LocalStorageService {
    localStorageSetItems(data: LocalStorageItems): void
    localStorageGetItems(): Promise<LocalStorageItems>
}

export class LocalStorageServiceImpl implements LocalStorageService {
    localStorageRepo: LocalStorageRepository

    constructor(ir: LocalStorageRepository) {
        this.localStorageRepo = ir
    }

    async localStorageSetItems(data: LocalStorageItems) {
        this.localStorageRepo.localStorageSetItems(data)
    }

    async localStorageGetItems(): Promise<LocalStorageItems> {
        return this.localStorageRepo.localStorageGetItems()
    }
}
