export default function getSearchString (partType: string) {
    switch (partType) {
        case 'gpu':
            return 'https://www.kupujemprodajem.com/kompjuteri-desktop/graficke-kartice/grupa/10/102/';
        case 'cpu':
            return 'https://www.kupujemprodajem.com/kompjuteri-desktop/procesori/grupa/10/94/';
        case 'ssd':
            return 'https://www.kupujemprodajem.com/kompjuteri-desktop/hard-diskovi-ssd/grupa/10/1350/';
        default:
            return 'NOT_FOUND';
    }
}