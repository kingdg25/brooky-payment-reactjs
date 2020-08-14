import { LocalStorageItems } from "../../domain/entities/LocalStorage"
import { LocalStorageRepository } from "../../domain/repositories/LocalStorageRepository"

export class LocalStorageRepositoryImpl implements LocalStorageRepository {
    async localStorageSetItems(data: LocalStorageItems) {
        localStorage.setItem("localData", JSON.stringify(data))
    }

    async localStorageGetItems(): Promise<LocalStorageItems> {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        const localData = JSON.parse(<string>localStorage.getItem("localData"))
        return localData
    }
}
