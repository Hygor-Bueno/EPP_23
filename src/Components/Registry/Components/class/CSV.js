export class CSVGenerator { 
    /**
     * Método generateCSV
     * Gera um arquivo CSV a partir das tarefas obtidas pela função getTasks e realiza o download.
     */
    generateCSV(jsonData, nameFile=`documento`) {
      try {
        const csvData = this.#convertToCSV(jsonData);
        this.#downloadCSV(csvData, `${nameFile}.csv`);
      } catch (error) {
        console.error(error.message);
      }
    }
  
    /**
     * Método convertToCSV
     * Converte os dados fornecidos em formato JSON para uma string CSV.
     * @param {string[] | number[] | any[]} data - Array de objetos contendo os dados a serem convertidos.
     * @returns {string} - String CSV gerada a partir dos dados.
     */
    #convertToCSV(data) {
      try {
        const header = Object.keys(data[0]).join('\t');
        const rows = data.map(obj => Object.values(obj).join('\t'));
        return `${header}\n${rows.join('\n')}`;
      } catch (error) {
        console.error(error.message);
      }
    }
  
    /**
     * Método downloadCSV
     * Inicia o download do arquivo CSV gerado.
     * @param {string} csv - String CSV a ser baixada.
     * @param {string} filename - Nome do arquivo CSV a ser baixado.
     */
    #downloadCSV(csv, filename) {
      try {
        const blob = new Blob([csv], { type: `text/csv;charset=utf-8, ${encodeURIComponent(csv)}` });
        const url = URL.createObjectURL(blob);
    
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
    
        document.body.appendChild(a);
        a.click();
    
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error(error.message);
      }
    }
  }
  