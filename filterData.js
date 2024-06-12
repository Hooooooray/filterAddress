const fs = require('fs');
const path = require('path');

// 读取json文件
const readJsonFile = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading the file:', err);
        return null;
    }
};

// 根据id数组筛选数据
const filterDataByIds = (data, ids) => {
    return data.filter(item => ids.includes(item.id));
};

// 写入筛选后的数据到新文件
const writeDataToFile = (filePath, data) => {
    const content = `const filteredData = ${JSON.stringify(data, null, 2)};\nexport default filteredData;`;
    try {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('File has been written');
    } catch (err) {
        console.error('Error writing the file:', err);
    }
};

// 主函数
const main = () => {
    const inputFilePath = path.join(__dirname, 'countries+states+cities.json');
    const outputFilePath = path.join(__dirname, 'filteredData.js');
    const idsToFilter = [14, 132, 199, 219, 240]; // 需要筛选的id值数组

    const jsonData = readJsonFile(inputFilePath);
    if (jsonData) {
        const filteredData = filterDataByIds(jsonData, idsToFilter);
        writeDataToFile(outputFilePath, filteredData);
    }
};

main();
