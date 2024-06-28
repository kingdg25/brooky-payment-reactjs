import { LocalStorageItems } from "../entities/LocalStorage"
import { CheckoutRepository } from "../repositories/CheckoutRepository"
import { LocalStorageRepository } from "../repositories/LocalStorageRepository"

export interface LocalStorageService {
    localStorageSetItems(data: LocalStorageItems): void
    localStorageGetItems(): Promise<LocalStorageItems>
}

export class LocalStorageServiceImpl implements LocalStorageService {
    localStorageRepo: LocalStorageRepository
    checkoutRepo: CheckoutRepository

    constructor(ir: LocalStorageRepository, ch: CheckoutRepository) {
        this.checkoutRepo = ch
        this.localStorageRepo = ir
    }

    async localStorageSetItems(data: LocalStorageItems) {
        this.localStorageRepo.localStorageSetItems(data)
    }

    async localStorageGetItems(): Promise<LocalStorageItems> {
        return this.localStorageRepo.localStorageGetItems()
    }
}
