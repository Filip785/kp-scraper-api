import xlsx, { WorkBook } from 'xlsx';
import getFilePathAndName from '@shared/filepath-helper';
import getFileSize from '@shared/filesize-helper';

export class XLSXDocumentBuilder {
    private wb: WorkBook;
    private wsData: string[][];
    private fileName: string;
    private filePath: string;

    constructor() {
        this.wb = xlsx.utils.book_new();
        this.wsData = this.getDefaultWSData();

        this.fileName = '';
        this.filePath = '';
    }

    getDefaultWSData(): string[][] {
        return [
            ['Ime', 'Cena', 'Link']
        ];
    }

    addWSDataItem(nameItem: string, price: string, link: string) {
        this.wsData.push([nameItem, price, link]);
    }

    addEntry(pageNumber: number) {
        const ws = xlsx.utils.aoa_to_sheet(this.wsData);
        xlsx.utils.book_append_sheet(this.wb, ws, `KP Stranica ${pageNumber}`);
        
        this.wsData = this.getDefaultWSData();
    }

    write(partType: string, fileId: string) {
        const { fileName, filePath } = getFilePathAndName(partType, fileId);

        this.fileName = fileName;
        this.filePath = filePath;

        xlsx.writeFile(this.wb, filePath);
    }

    getFileName() {
        return this.fileName;
    }

    getFileSize() {
        return getFileSize(this.filePath);
    }
}