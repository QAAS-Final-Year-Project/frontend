import { learningMaterialsArticles } from "../data";

export const useLearningArticles = (variables?: any) => {
    const { page, pageSize, search } = variables || { page: 1, pageSize: 10, search: "" };
    const start = (parseInt(page) - 1) * pageSize;
    const end = start + pageSize;
    const items = learningMaterialsArticles.filter(el => {
        return el.title.toLowerCase().includes(search.toLowerCase()) ||
            el.description.toLowerCase().includes(search.toLowerCase())
    }).slice(start, end);
    return {
        articles: items,
        count: learningMaterialsArticles.filter(el => {
            return el.title.toLowerCase().includes(search.toLowerCase()) ||
                el.description.toLowerCase().includes(search.toLowerCase())
        }).length
    }
}