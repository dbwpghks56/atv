export function queryColumns(requestInfo: string[]) {
    const columns = {} as Record<string, boolean>;

    requestInfo.forEach(column => {
        columns[column] = true;
    });

    return columns;
}