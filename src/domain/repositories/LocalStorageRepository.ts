import { LocalStorageItems } from "../entities/LocalStorage"

export interface LocalStorageRepository {
    localStorageSetItems(data: LocalStorageItems): void
    localStorageGetItems(): Promise<LocalStorageItems>
}
