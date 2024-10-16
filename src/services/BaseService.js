export default class BaseService {
    getParamsFromCriteriaObject(criterias) {
        const searchParams = new URLSearchParams(criterias);
        return searchParams.toString()
    }
}