const Papa = require("papaparse");

const findLongestWorkingPair = async (file) => {
  return await new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const data = results.data;
        let workingPairs = {};
        for (let i = 0; i < data.length; i++) {
          const empID = data[i].EmpID;
          const projectID = data[i].ProjectID;
          const dateFrom = new Date(data[i].DateFrom);
          const dateTo = new Date(data[i].DateTo);
          const duration = dateTo.getTime() - dateFrom.getTime();
          if (workingPairs[projectID]) {
            for (let j = 0; j < workingPairs[projectID].length; j++) {
              if (workingPairs[projectID][j].includes(empID)) {
                workingPairs[projectID][j][2] += duration;
                break;
              }
            }
          } else {
            workingPairs[projectID] = [[empID, empID, duration]];
          }
        }
        let longestWorkingPair;
        let maxDuration = 0;
        for (let projectID in workingPairs) {
          for (let i = 0; i < workingPairs[projectID].length; i++) {
            if (workingPairs[projectID][i][2] > maxDuration) {
              maxDuration = workingPairs[projectID][i][2];
              longestWorkingPair = workingPairs[projectID][i];
            }
          }
        }
        resolve(longestWorkingPair);
      },
    });
  });
};
