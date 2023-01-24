const csv = `EmployeeID,ProjectID,DateFrom,DateTo
1,1001,2022-01-01,2022-03-31
1,1002,2022-04-01,2022-05-31
2,1001,2022-01-01,2022-03-31
2,1002,2022-04-01,2022-05-31
3,1001,2022-02-01,2022-03-31
3,1002,2022-04-01,2022-05-31`;

const rows = csv.split("\n").slice(1); // remove header row
const today = new Date();

let longestPeriod = {
  employee1: null,
  employee2: null,
  project: null,
  period: 0,
};

rows.forEach((row) => {
  const cells = row.split(",");
  const employee = cells[0];
  const project = cells[1];
  const dateFrom = new Date(cells[2]);
  let dateTo = cells[3] ? new Date(cells[3]) : today;

  rows.forEach((compareRow) => {
    const compareCells = compareRow.split(",");
    const compareEmployee = compareCells[0];
    const compareProject = compareCells[1];
    const compareDateFrom = new Date(compareCells[2]);
    let compareDateTo = compareCells[3] ? new Date(compareCells[3]) : today;

    if (employee === compareEmployee || project !== compareProject) {
      return;
    }

    const start = dateFrom > compareDateFrom ? dateFrom : compareDateFrom;
    const end = dateTo < compareDateTo ? dateTo : compareDateTo;
    const period = end - start;

    if (period > longestPeriod.period) {
      longestPeriod = {
        employee1: employee,
        employee2: compareEmployee,
        project: project,
        period: period,
      };
    }
  });
});

const result = [
  longestPeriod.employee1,
  longestPeriod.employee2,
  longestPeriod.project,
  Math.ceil(longestPeriod.period / (1000 * 60 * 60 * 24)),
];
console.log(result);
