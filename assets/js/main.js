function showInnerJoinResult() {
  const speedInput = document.getElementById("speedControlRange");
const rawValue = parseInt(speedInput?.value || "800");

// Map: rawValue = 100 → 2000ms, rawValue = 2000 → 100ms
const SPEED = 2100 - rawValue;

  const resultTableBody = document.getElementById("resultTableBody");
  const resultContainer = document.getElementById("resultContainer");

  const productRows = document.querySelectorAll("#productsTable tbody tr");
  const categoryRows = document.querySelectorAll("#categoriesTable tbody tr");

  resultTableBody.innerHTML = "";
  resultContainer.classList.remove("d-none");
  resultContainer.style.display = "block";

  let index = 0;
  function animateRow() {
    if (index >= productRows.length) return;

    const prodRow = productRows[index];
    const prodCatId = prodRow.children[2].textContent.trim();

    prodRow.style.transition = "background-color 0.3s";
    prodRow.style.backgroundColor = "lightblue";

    setTimeout(() => {
      const matchingCat = Array.from(categoryRows).find(row =>
        row.children[0].textContent.trim() === prodCatId
      );

      if (matchingCat) {
        matchingCat.style.transition = "background-color 0.3s";
        matchingCat.style.backgroundColor = "lightblue";
      }

      setTimeout(() => {
        if (matchingCat) {
          prodRow.style.backgroundColor = "lightgreen";
          matchingCat.style.backgroundColor = "lightgreen";

          const newRow = document.createElement("tr");
          newRow.innerHTML = `<td>${prodRow.children[0].textContent.trim()}</td>
                              <td>${prodRow.children[1].textContent.trim()}</td>
                              <td>${matchingCat.children[1].textContent.trim()}</td>`;
          newRow.style.opacity = "0";
          newRow.style.transition = "opacity 0.5s";
          resultTableBody.appendChild(newRow);
          setTimeout(() => newRow.style.opacity = "1", 100);
        }

        setTimeout(() => {
          prodRow.style.backgroundColor = "";
          if (matchingCat) matchingCat.style.backgroundColor = "";
          index++;
          animateRow();
        }, SPEED);
      }, SPEED);
    }, SPEED);
  }

  animateRow();
}


function second() {
  const speedInput = document.getElementById("speedControlRange");
  const rawValue = parseInt(speedInput?.value || "800");
  
  
  const SPEED = 2100 - rawValue;

  const resultTableBody = document.getElementById("resultTableBody2");
  const resultContainer = document.getElementById("resultContainer2");

  const orderRows = document.querySelectorAll("#ordersTable tbody tr");
  const customerRows = document.querySelectorAll("#customersTable tbody tr");
  const shipperRows = document.querySelectorAll("#shippersTable tbody tr");

  resultTableBody.innerHTML = "";
  resultContainer.classList.remove("d-none");
  resultContainer.style.display = "block";

  let index = 0;

  function animateRow() {
    if (index >= orderRows.length) {
      console.log("All rows processed.");
      return;
    }

    const orderRow = orderRows[index];
    const orderCustomerId = orderRow.children[1].textContent.trim();
    const orderShipperId = orderRow.children[2].textContent.trim();

    orderRow.style.transition = "background-color 0.3s";
    orderRow.style.backgroundColor = "lightblue";

    setTimeout(() => {
      const customerRow = Array.from(customerRows).find(
        row => row.children[0].textContent.trim() === orderCustomerId
      );

      const shipperRow = Array.from(shipperRows).find(
        row => row.children[0].textContent.trim() === orderShipperId
      );

      if (customerRow) customerRow.style.backgroundColor = "lightblue";
      if (shipperRow) shipperRow.style.backgroundColor = "lightblue";

      setTimeout(() => {
        if (customerRow && shipperRow) {
          orderRow.style.backgroundColor = "lightgreen";
          customerRow.style.backgroundColor = "lightgreen";
          shipperRow.style.backgroundColor = "lightgreen";

          const newRow = document.createElement("tr");
          newRow.innerHTML = `<td>${orderRow.children[0].textContent.trim()}</td>
                              <td>${customerRow.children[1].textContent.trim()}</td>
                              <td>${shipperRow.children[1].textContent.trim()}</td>`;
          newRow.style.opacity = "0";
          newRow.style.transition = "opacity 0.5s";
          resultTableBody.appendChild(newRow);

          setTimeout(() => {
            newRow.style.opacity = "1";
          }, 100);
        }

        setTimeout(() => {
          orderRow.style.backgroundColor = "";
          if (customerRow) customerRow.style.backgroundColor = "";
          if (shipperRow) shipperRow.style.backgroundColor = "";

          index++;
          animateRow();
        }, SPEED);
      }, SPEED);
    }, SPEED);
  }

  animateRow();
}


// document.addEventListener("DOMContentLoaded", function () {
//   const showJoinButton = document.getElementById("showJoinButton2");
//   if (showJoinButton) {
//     showJoinButton.addEventListener("click", showInnerJoinResult);
//     console.log("Button event listener attached.");
//   } else {
//     console.error(" Button not found!");
//   }
// });



document.addEventListener("DOMContentLoaded", function () {
  const showJoinButton = document.getElementById("showJoinButton");
  if (showJoinButton) {
    showJoinButton.addEventListener("click", showInnerJoinResult);
    console.log("✅ Button event listener attached!");
  } else {
    console.error("❌ Button not found!");
  }
});

function showLeftJoinResult() {
  const speedInput = document.getElementById("leftJoinSpeed");
  const rawValue = parseInt(speedInput?.value || "800");
  const SPEED = 2100 - rawValue;

  const resultTableBody = document.getElementById("leftJoinResultBody");
  const resultContainer = document.getElementById("leftJoinResultContainer");

  const employeeRows = document.querySelectorAll("#leftJoinEmployees tbody tr");
  const departmentRows = document.querySelectorAll("#leftJoinDepartments tbody tr");

  resultTableBody.innerHTML = "";
  resultContainer.classList.remove("d-none");
  resultContainer.style.display = "block";

  let index = 0;

  function animateRow() {
    if (index >= employeeRows.length) return;

    const empRow = employeeRows[index];
    const empID = empRow.children[0].textContent.trim();
    const empName = empRow.children[1].textContent.trim();
    const empDeptID = empRow.children[2].textContent.trim();

    empRow.style.transition = "background-color 0.3s";
    empRow.style.backgroundColor = "lightblue";

    setTimeout(() => {
      const matchingDept = Array.from(departmentRows).find(
        row => row.children[0].textContent.trim() === empDeptID
      );

      if (matchingDept) {
        matchingDept.style.transition = "background-color 0.3s";
        matchingDept.style.backgroundColor = "lightblue";
      }

      setTimeout(() => {
        // Highlight final state
        if (matchingDept) {
          empRow.style.backgroundColor = "lightgreen";
          matchingDept.style.backgroundColor = "lightgreen";
        } else {
          empRow.style.backgroundColor = "orange"; // unmatched
        }

        // Create result row
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
          <td>${empID}</td>
          <td>${empName}</td>
          <td>${matchingDept ? matchingDept.children[1].textContent.trim() : "<span style='color:gray'>NULL</span>"}</td>
        `;
        newRow.style.opacity = "0";
        newRow.style.transition = "opacity 0.6s";
        resultTableBody.appendChild(newRow);

        setTimeout(() => {
          newRow.style.opacity = "1";
        }, 100);

        setTimeout(() => {
          empRow.style.backgroundColor = "";
          if (matchingDept) matchingDept.style.backgroundColor = "";
          index++;
          animateRow();
        }, SPEED);
      }, SPEED);
    }, SPEED);
  }

  animateRow();
}


function showwhereclause() {
  const speedInput = document.getElementById("selectAdvancedSpeed");
  const rawValue = parseInt(speedInput?.value || "800");
  const SPEED = 2100 - rawValue;

  const resultTableBody = document.getElementById("selectAdvancedResultBody");
  const resultContainer = document.getElementById("selectAdvancedResultContainer");
  const studentRows = document.querySelectorAll("#selectAdvancedStudents tbody tr");

  resultTableBody.innerHTML = "";
  resultContainer.style.display = "block";

  let index = 0;

  const matchingRows = Array.from(studentRows).filter((row) => {
    const gender = row.children[3].textContent.trim();
    const city = row.children[4].textContent.trim();
    const age = parseInt(row.children[2].textContent.trim());
    return gender === "Female" && city === "Mumbai" && age > 21;
  });

  function animateRow() {
    if (index >= matchingRows.length) return;

    const studentRow = matchingRows[index];
    const studentID = studentRow.children[0].textContent.trim();
    const studentName = studentRow.children[1].textContent.trim();
    const identifier = `${studentID}-${studentName}`;

    studentRow.style.transition = "background-color 0.3s";
    studentRow.style.backgroundColor = "lightblue";

    setTimeout(() => {
      studentRow.style.backgroundColor = "lightgreen";

      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${studentID}</td>
        <td>${studentName}</td>
        <td>${identifier}</td>
      `;
      newRow.style.opacity = "0";
      newRow.style.transition = "opacity 0.6s";
      resultTableBody.appendChild(newRow);

      setTimeout(() => {
        newRow.style.opacity = "1";
      }, 100);

      setTimeout(() => {
        studentRow.style.backgroundColor = "";
        index++;
        animateRow();
      }, SPEED);
    }, SPEED);
  }

  animateRow();
}


function showStudentJoin() {
  const speedInput = document.getElementById("speedControlStudents");
  const rawValue = parseInt(speedInput?.value || "800");
  const SPEED = 2100 - rawValue;

  const resultTableBody = document.getElementById("studentJoinBody");
  const resultContainer = document.getElementById("studentJoinResult");

  const studentRows = document.querySelectorAll("#studentsTable tbody tr");
  const courseRows = document.querySelectorAll("#coursesTable tbody tr");

  resultTableBody.innerHTML = "";
  resultContainer.classList.remove("d-none");
  resultContainer.style.display = "block";

  let index = 0;

  function animateRow() {
    if (index >= studentRows.length) return;

    const studentRow = studentRows[index];
    const studentID = studentRow.children[0].textContent.trim();
    const studentName = studentRow.children[1].textContent.trim();

    studentRow.style.transition = "background-color 0.3s";
    studentRow.style.backgroundColor = "lightblue";

    setTimeout(() => {
      const matchingCourse = Array.from(courseRows).find(
        row => row.children[0].textContent.trim() === studentID
      );

      if (matchingCourse) {
        matchingCourse.style.transition = "background-color 0.3s";
        matchingCourse.style.backgroundColor = "lightblue";
      }

      setTimeout(() => {
        // Final highlight
        if (matchingCourse) {
          studentRow.style.backgroundColor = "lightgreen";
          matchingCourse.style.backgroundColor = "lightgreen";
        } else {
          studentRow.style.backgroundColor = "orange"; // unmatched
        }

        // Create result row
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
          <td>${studentID}</td>
          <td>${studentName}</td>
          <td>${matchingCourse ? matchingCourse.children[1].textContent.trim() : "<span style='color:gray'>NULL</span>"}</td>
        `;
        newRow.style.opacity = "0";
        newRow.style.transition = "opacity 0.6s";
        resultTableBody.appendChild(newRow);

        setTimeout(() => {
          newRow.style.opacity = "1";
        }, 100);

        setTimeout(() => {
          studentRow.style.backgroundColor = "";
          if (matchingCourse) matchingCourse.style.backgroundColor = "";
          index++;
          animateRow();
        }, SPEED);
      }, SPEED);
    }, SPEED);
  }

  animateRow();
}




function showWindowFunction() {
  const speedInput = document.getElementById("windowFuncSpeed");
  const rawValue = parseInt(speedInput?.value || "800");
  const SPEED = 2100 - rawValue;

  const resultBody = document.getElementById("windowFunctionResultBody");
  const studentRows = document.querySelectorAll("#windowFunctionStudents tbody tr");
  const resultContainer = document.getElementById("windowFunctionResultContainer");

  resultBody.innerHTML = "";
  resultContainer.style.display = "block";

  const students = Array.from(studentRows).map((row) => {
    return {
      id: row.children[0].textContent.trim(),
      name: row.children[1].textContent.trim(),
      dept: row.children[2].textContent.trim(),
      score: parseInt(row.children[3].textContent.trim())
    };
  });

  // Partition by Department, Order by Score DESC
  const partitioned = {};
  students.forEach(student => {
    if (!partitioned[student.dept]) partitioned[student.dept] = [];
    partitioned[student.dept].push(student);
  });

  Object.keys(partitioned).forEach(dept => {
    partitioned[dept].sort((a, b) => b.score - a.score);
    partitioned[dept].forEach((s, index) => {
      s.rowNumber = index + 1;
    });
  });

  const flatList = Object.values(partitioned).flat();

  let index = 0;
  function animateRow() {
    if (index >= flatList.length) return;

    const s = flatList[index];
    const studentRow = Array.from(studentRows).find(r => 
      r.children[0].textContent.trim() === s.id
    );

    studentRow.style.transition = "background-color 0.3s";
    studentRow.style.backgroundColor = "#ffd54f";

    setTimeout(() => {
      studentRow.style.backgroundColor = "#aed581";

      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${s.id}</td>
        <td>${s.name}</td>
        <td>${s.dept}</td>
        <td>${s.score}</td>
        <td>${s.rowNumber}</td>
      `;
      newRow.style.opacity = "0";
      newRow.style.transition = "opacity 0.6s";
      resultBody.appendChild(newRow);

      setTimeout(() => newRow.style.opacity = "1", 100);

      setTimeout(() => {
        studentRow.style.backgroundColor = "";
        index++;
        animateRow();
      }, SPEED);
    }, SPEED);
  }

  animateRow();
}
function showLagFunction() {
  const speedInput = document.getElementById("lagSpeed");
  const rawValue = parseInt(speedInput?.value || "800");
  const SPEED = 2100 - rawValue;

  const resultBody = document.getElementById("lagResultBody");
  const studentRows = document.querySelectorAll("#lagStudents tbody tr");
  const resultContainer = document.getElementById("lagResultContainer");

  resultBody.innerHTML = "";
  resultContainer.style.display = "block";

  const students = Array.from(studentRows).map((row) => {
    return {
      id: row.children[0].textContent.trim(),
      name: row.children[1].textContent.trim(),
      score: parseInt(row.children[3].textContent.trim())
    };
  });

  students.sort((a, b) => a.score - b.score);

  for (let i = 0; i < students.length; i++) {
    students[i].prevScore = students[i - 1] ? students[i - 1].score : null;
  }

  let index = 0;
  function animateRow() {
    if (index >= students.length) return;

    const s = students[index];
    const studentRow = Array.from(studentRows).find(r => 
      r.children[0].textContent.trim() === s.id
    );

    studentRow.style.transition = "background-color 0.3s";
    studentRow.style.backgroundColor = "#80deea";

    setTimeout(() => {
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${s.id}</td>
        <td>${s.name}</td>
        <td>${s.score}</td>
        <td>${s.prevScore !== null ? s.prevScore : "NULL"}</td>
      `;
      newRow.style.opacity = "0";
      newRow.style.transition = "opacity 0.6s";
      resultBody.appendChild(newRow);
      setTimeout(() => newRow.style.opacity = "1", 100);

      setTimeout(() => {
        studentRow.style.backgroundColor = "";
        index++;
        animateRow();
      }, SPEED);
    }, SPEED);
  }

  animateRow();
}

function showSelectAdvanced() {
  const speedInput = document.getElementById("selectAdvancedSpeed");
  const rawValue = parseInt(speedInput?.value || "800");
  const SPEED = 2100 - rawValue;

  const resultTableBody = document.getElementById("selectAdvancedResultBody");
  const resultContainer = document.getElementById("selectAdvancedResultContainer");
  const studentRows = document.querySelectorAll("#selectAdvancedStudents tbody tr");

  resultTableBody.innerHTML = "";
  resultContainer.style.display = "block";

  let index = 0;

  function animateRow() {
    if (index >= studentRows.length) return;

    const studentRow = studentRows[index];
    const studentID = studentRow.children[0].textContent.trim();
    const studentName = studentRow.children[1].textContent.trim();
    const identifier = `${studentID}-${studentName}`;

    studentRow.style.transition = "background-color 0.3s";
    studentRow.style.backgroundColor = "lightblue";

    setTimeout(() => {
      studentRow.style.backgroundColor = "lightgreen";

      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${studentID}</td>
        <td>${studentName}</td>
        <td>${identifier}</td>
      `;
      newRow.style.opacity = "0";
      newRow.style.transition = "opacity 0.6s";
      resultTableBody.appendChild(newRow);

      setTimeout(() => {
        newRow.style.opacity = "1";
      }, 100);

      setTimeout(() => {
        studentRow.style.backgroundColor = "";
        index++;
        animateRow();
      }, SPEED);
    }, SPEED);
  }

  animateRow();
}

function showSelectOnly() {
  const speedInput = document.getElementById("selectOnlySpeed");
  const rawValue = parseInt(speedInput?.value || "800");
  const SPEED = 2100 - rawValue;

  const resultTableBody = document.getElementById("selectOnlyResultBody");
  const resultContainer = document.getElementById("selectOnlyResultContainer");
  const studentRows = document.querySelectorAll("#selectOnlyStudents tbody tr");

  resultTableBody.innerHTML = "";
  resultContainer.style.display = "block";

  let index = 0;

  function animateRow() {
    if (index >= studentRows.length) return;

    const studentRow = studentRows[index];
    const studentName = studentRow.children[1].textContent.trim();

    studentRow.style.transition = "background-color 0.3s";
    studentRow.style.backgroundColor = "lightblue";

    setTimeout(() => {
      studentRow.style.backgroundColor = "lightgreen";

      const newRow = document.createElement("tr");
      newRow.innerHTML = `<td>${studentName}</td>`;
      newRow.style.opacity = "0";
      newRow.style.transition = "opacity 0.6s";
      resultTableBody.appendChild(newRow);

      setTimeout(() => {
        newRow.style.opacity = "1";
      }, 100);

      setTimeout(() => {
        studentRow.style.backgroundColor = "";
        index++;
        animateRow();
      }, SPEED);
    }, SPEED);
  }

  animateRow();
}


function showLeadFunction() {
  const speedInput = document.getElementById("leadSpeed");
  const rawValue = parseInt(speedInput?.value || "800");
  const SPEED = 2100 - rawValue;

  const resultBody = document.getElementById("leadResultBody");
  const studentRows = document.querySelectorAll("#leadStudents tbody tr");
  const resultContainer = document.getElementById("leadResultContainer");

  resultBody.innerHTML = "";
  resultContainer.style.display = "block";

  const students = Array.from(studentRows).map((row) => {
    return {
      id: row.children[0].textContent.trim(),
      name: row.children[1].textContent.trim(),
      score: parseInt(row.children[3].textContent.trim())
    };
  });

  students.sort((a, b) => a.score - b.score);

  for (let i = 0; i < students.length; i++) {
    students[i].nextScore = students[i + 1] ? students[i + 1].score : null;
  }

  let index = 0;
  function animateRow() {
    if (index >= students.length) return;

    const s = students[index];
    const studentRow = Array.from(studentRows).find(r => 
      r.children[0].textContent.trim() === s.id
    );

    studentRow.style.transition = "background-color 0.3s";
    studentRow.style.backgroundColor = "#90caf9";

    setTimeout(() => {
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${s.id}</td>
        <td>${s.name}</td>
        <td>${s.score}</td>
        <td>${s.nextScore !== null ? s.nextScore : "NULL"}</td>
      `;
      newRow.style.opacity = "0";
      newRow.style.transition = "opacity 0.6s";
      resultBody.appendChild(newRow);
      setTimeout(() => newRow.style.opacity = "1", 100);

      setTimeout(() => {
        studentRow.style.backgroundColor = "";
        index++;
        animateRow();
      }, SPEED);
    }, SPEED);
  }

  animateRow();
}

function showDenseRank() {
  const speedInput = document.getElementById("denseRankSpeed");
  const rawValue = parseInt(speedInput?.value || "800");
  const SPEED = 2100 - rawValue;

  const resultBody = document.getElementById("denseRankResultBody");
  const studentRows = document.querySelectorAll("#denseRankStudents tbody tr");
  const resultContainer = document.getElementById("denseRankResultContainer");

  resultBody.innerHTML = "";
  resultContainer.style.display = "block";

  const students = Array.from(studentRows).map((row) => {
    return {
      id: row.children[0].textContent.trim(),
      name: row.children[1].textContent.trim(),
      dept: row.children[2].textContent.trim(),
      score: parseInt(row.children[3].textContent.trim())
    };
  });

  // Partition by Department, Order by Score DESC
  const partitioned = {};
  students.forEach(student => {
    if (!partitioned[student.dept]) partitioned[student.dept] = [];
    partitioned[student.dept].push(student);
  });

  Object.keys(partitioned).forEach(dept => {
    const group = partitioned[dept];
    group.sort((a, b) => b.score - a.score);

    let rank = 1;
    let prevScore = null;
    group.forEach((s, index) => {
      if (s.score !== prevScore) {
        rank = index + 1;
        prevScore = s.score;
      }
      s.denseRank = rank;
    });
  });

  const flatList = Object.values(partitioned).flat();

  let index = 0;
  function animateRow() {
    if (index >= flatList.length) return;

    const s = flatList[index];
    const studentRow = Array.from(studentRows).find(r => 
      r.children[0].textContent.trim() === s.id
    );

    studentRow.style.transition = "background-color 0.3s";
    studentRow.style.backgroundColor = "#ffd54f";

    setTimeout(() => {
      studentRow.style.backgroundColor = "#fff176";

      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${s.id}</td>
        <td>${s.name}</td>
        <td>${s.dept}</td>
        <td>${s.score}</td>
        <td>${s.denseRank}</td>
      `;
      newRow.style.opacity = "0";
      newRow.style.transition = "opacity 0.6s";
      resultBody.appendChild(newRow);

      setTimeout(() => newRow.style.opacity = "1", 100);

      setTimeout(() => {
        studentRow.style.backgroundColor = "";
        index++;
        animateRow();
      }, SPEED);
    }, SPEED);
  }

  animateRow();
}


function showSubqueryInClause() {
  const speedInput = document.getElementById("selectAdvancedSpeed");
  const rawValue = parseInt(speedInput?.value || "800");
  const SPEED = 2100 - rawValue;

  const resultTableBody = document.getElementById("selectAdvancedResultBody");
  const resultContainer = document.getElementById("selectAdvancedResultContainer");

  const studentRows = document.querySelectorAll("#selectAdvancedStudents tbody tr");
  const topCitiesRows = document.querySelectorAll("#topCitiesTable tbody tr");

  resultTableBody.innerHTML = "";
  resultContainer.style.display = "block";

  const topCitiesSet = new Set();
  topCitiesRows.forEach(row => {
    topCitiesSet.add(row.children[0].textContent.trim());
  });

  const matchingRows = Array.from(studentRows).filter(row => {
    const city = row.children[4].textContent.trim();
    return topCitiesSet.has(city);
  });

  let index = 0;

  function animateRow() {
    if (index >= matchingRows.length) return;

    const studentRow = matchingRows[index];
    const studentID = studentRow.children[0].textContent.trim();
    const studentName = studentRow.children[1].textContent.trim();
    const city = studentRow.children[4].textContent.trim();

    studentRow.style.transition = "background-color 0.3s";
    studentRow.style.backgroundColor = "lightblue";

    setTimeout(() => {
      studentRow.style.backgroundColor = "lightgreen";

      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${studentID}</td>
        <td>${studentName}</td>
        <td>${city}</td>
      `;
      newRow.style.opacity = "0";
      newRow.style.transition = "opacity 0.6s";
      resultTableBody.appendChild(newRow);

      setTimeout(() => {
        newRow.style.opacity = "1";
      }, 100);

      setTimeout(() => {
        studentRow.style.backgroundColor = "";
        index++;
        animateRow();
      }, SPEED);
    }, SPEED);
  }

  animateRow();
}


function showComplexJoinQuery() {
  const speedInput = document.getElementById("complexSpeed");
  const SPEED = 2100 - parseInt(speedInput?.value || "800");

  const students = Array.from(document.querySelectorAll("#multiTableStudents tbody tr")).map(row => ({
    StudentID: row.children[0].textContent.trim(),
    StudentName: row.children[1].textContent.trim(),
    DepartmentID: row.children[2].textContent.trim(),
    Marks: parseInt(row.children[3].textContent.trim()),
    row
  }));

  const departments = Array.from(document.querySelectorAll("#multiTableDepartments tbody tr")).map(row => ({
    DeptID: row.children[0].textContent.trim(),
    DeptName: row.children[1].textContent.trim()
  }));

  const courses = Array.from(document.querySelectorAll("#multiTableCourses tbody tr")).map(row => ({
    CourseName: row.children[1].textContent.trim(),
    DeptID: row.children[2].textContent.trim(),
    CourseLevel: row.children[3].textContent.trim()
  }));

  const resultTableBody = document.getElementById("complexResultBody");
  const resultContainer = document.getElementById("complexResultContainer");

  resultTableBody.innerHTML = "";
  resultContainer.style.display = "block";

  const results = [];

  students.forEach(student => {
    if (student.Marks >= 75) {
      const dept = departments.find(d => d.DeptID === student.DepartmentID);
      const matchingCourses = courses.filter(
        c => c.DeptID === student.DepartmentID && c.CourseLevel === "Advanced"
      );

      matchingCourses.forEach(course => {
        results.push({
          ...student,
          DeptName: dept.DeptName,
          CourseName: course.CourseName
        });
      });
    }
  });

  results.sort((a, b) => b.Marks - a.Marks);

  let index = 0;
  function animateRow() {
    if (index >= results.length) return;

    const r = results[index];
    r.row.style.transition = "background-color 0.3s";
    r.row.style.backgroundColor = "#03a9f4";

    setTimeout(() => {
      r.row.style.backgroundColor = "#4caf50";

      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${r.StudentID}</td>
        <td>${r.StudentName}</td>
        <td>${r.DeptName}</td>
        <td>${r.CourseName}</td>
        <td>${r.Marks}</td>
      `;
      newRow.style.opacity = "0";
      newRow.style.transition = "opacity 0.6s";
      resultTableBody.appendChild(newRow);

      setTimeout(() => {
        newRow.style.opacity = "1";
      }, 100);

      setTimeout(() => {
        r.row.style.backgroundColor = "";
        index++;
        animateRow();
      }, SPEED);
    }, SPEED);
  }

  animateRow();
}




function showRightJoinResult() {
  const speedInput = document.getElementById("rightJoinSpeed");
  const rawValue = parseInt(speedInput?.value || "800");
  const SPEED = 2100 - rawValue;

  const resultTableBody = document.getElementById("rightJoinResultBody");
  const resultContainer = document.getElementById("rightJoinResultContainer");

  const employeeRows = document.querySelectorAll("#rightJoinEmployees tbody tr");
  const departmentRows = document.querySelectorAll("#rightJoinDepartments tbody tr");

  resultTableBody.innerHTML = "";
  resultContainer.classList.remove("d-none");
  resultContainer.style.display = "block";

  let index = 0;

  function animateRow() {
    if (index >= departmentRows.length) return;

    const departmentRow = departmentRows[index];
    const deptID = departmentRow.children[0].textContent.trim();
    const deptName = departmentRow.children[1].textContent.trim();

    departmentRow.style.transition = "background-color 0.3s";
    departmentRow.style.backgroundColor = "lightblue";

    setTimeout(() => {
      const matchingEmployees = Array.from(employeeRows).filter(
        row => row.children[2].textContent.trim() === deptID
      );

      if (matchingEmployees.length > 0) {
        matchingEmployees.forEach(empRow => {
          empRow.style.transition = "background-color 0.3s";
          empRow.style.backgroundColor = "lightblue";
        });
      }

      setTimeout(() => {
        if (matchingEmployees.length > 0) {
          matchingEmployees.forEach(empRow => {
            empRow.style.backgroundColor = "lightgreen";
            departmentRow.style.backgroundColor = "lightgreen";

            const newRow = document.createElement("tr");
            newRow.innerHTML = `
              <td>${empRow.children[0].textContent.trim()}</td>
              <td>${empRow.children[1].textContent.trim()}</td>
              <td>${deptName}</td>
            `;
            newRow.style.opacity = "0";
            newRow.style.transition = "opacity 0.6s";
            resultTableBody.appendChild(newRow);

            setTimeout(() => {
              newRow.style.opacity = "1";
            }, 100);
          });
        } else {
          departmentRow.style.backgroundColor = "orange"; // unmatched dept

          const newRow = document.createElement("tr");
          newRow.innerHTML = `
            <td><span style='color:gray'>NULL</span></td>
            <td><span style='color:gray'>NULL</span></td>
            <td>${deptName}</td>
          `;
          newRow.style.opacity = "0";
          newRow.style.transition = "opacity 0.6s";
          resultTableBody.appendChild(newRow);

          setTimeout(() => {
            newRow.style.opacity = "1";
          }, 100);
        }

        setTimeout(() => {
          departmentRow.style.backgroundColor = "";
          if (matchingEmployees.length > 0) {
            matchingEmployees.forEach(empRow => {
              empRow.style.backgroundColor = "";
            });
          }
          index++;
          animateRow();
        }, SPEED);
      }, SPEED);
    }, SPEED);
  }

  animateRow();
}

function showRightJoinResult2() { 
  const speedInput = document.getElementById("speedControlStudents");
  const rawValue = parseInt(speedInput?.value || "800");
  const SPEED = 2100 - rawValue;

  const resultTableBody = document.getElementById("studentJoinBody");
  const resultContainer = document.getElementById("studentJoinResult");

  const studentRows = document.querySelectorAll("#studentsTable tbody tr");
  const courseRows = document.querySelectorAll("#coursesTable tbody tr");

  resultTableBody.innerHTML = "";
  resultContainer.classList.remove("d-none");
  resultContainer.style.display = "block";

  let index = 0;

  function animateRow() {
    if (index >= courseRows.length) return;

    const courseRow = courseRows[index];
    const courseStudentID = courseRow.children[0].textContent.trim();
    const courseName = courseRow.children[1].textContent.trim();

    courseRow.style.transition = "background-color 0.3s";
    courseRow.style.backgroundColor = "lightblue";

    setTimeout(() => {
      const matchingStudents = Array.from(studentRows).filter(
        row => row.children[0].textContent.trim() === courseStudentID
      );

      if (matchingStudents.length > 0) {
        matchingStudents.forEach(studentRow => {
          studentRow.style.transition = "background-color 0.3s";
          studentRow.style.backgroundColor = "lightblue";
        });
      }

      setTimeout(() => {
        if (matchingStudents.length > 0) {
          matchingStudents.forEach(studentRow => {
            studentRow.style.backgroundColor = "lightgreen";
            courseRow.style.backgroundColor = "lightgreen";

            const newRow = document.createElement("tr");
            newRow.innerHTML = `
              <td>${studentRow.children[0].textContent.trim()}</td>
              <td>${studentRow.children[1].textContent.trim()}</td>
              <td>${courseName}</td>
            `;
            newRow.style.opacity = "0";
            newRow.style.transition = "opacity 0.6s";
            resultTableBody.appendChild(newRow);

            setTimeout(() => {
              newRow.style.opacity = "1";
            }, 100);
          });
        } else {
          courseRow.style.backgroundColor = "orange"; // unmatched course

          const newRow = document.createElement("tr");
          newRow.innerHTML = `
            <td><span style='color:gray'>NULL</span></td>
            <td><span style='color:gray'>NULL</span></td>
            <td>${courseName}</td>
          `;
          newRow.style.opacity = "0";
          newRow.style.transition = "opacity 0.6s";
          resultTableBody.appendChild(newRow);

          setTimeout(() => {
            newRow.style.opacity = "1";
          }, 100);
        }

        setTimeout(() => {
          courseRow.style.backgroundColor = "";
          if (matchingStudents.length > 0) {
            matchingStudents.forEach(studentRow => {
              studentRow.style.backgroundColor = "";
            });
          }
          index++;
          animateRow();
        }, SPEED);
      }, SPEED);
    }, SPEED);
  }

  animateRow();
}

function showFullJoinResult() {
  const speedInput = document.getElementById("fullJoinSpeed");
  const rawValue = parseInt(speedInput?.value || "800");
  const SPEED = 2100 - rawValue;

  const resultTableBody = document.getElementById("fullJoinResultBody");
  const resultContainer = document.getElementById("fullJoinResultContainer");

  const employeeRows = document.querySelectorAll("#fullJoinEmployees tbody tr");
  const departmentRows = document.querySelectorAll("#fullJoinDepartments tbody tr");

  resultTableBody.innerHTML = "";
  resultContainer.style.display = "block";

  const processedEmployeeIDs = new Set();
  const matchedDepartmentIDs = new Set();

  let combinedRows = [];

  // Phase 1: Match rows from Employees to Departments
  employeeRows.forEach(empRow => {
    const empID = empRow.children[0].textContent.trim();
    const empName = empRow.children[1].textContent.trim();
    const deptID = empRow.children[2].textContent.trim();

    let matchFound = false;

    departmentRows.forEach(depRow => {
      const departmentID = depRow.children[0].textContent.trim();
      const departmentName = depRow.children[1].textContent.trim();

      if (deptID === departmentID) {
        combinedRows.push({
          empID,
          empName,
          departmentName,
          empRow,
          depRow
        });
        matchFound = true;
        matchedDepartmentIDs.add(departmentID);
      }
    });

    if (!matchFound) {
      combinedRows.push({
        empID,
        empName,
        departmentName: "<span style='color:gray'>NULL</span>",
        empRow,
        depRow: null
      });
    }

    processedEmployeeIDs.add(empID);
  });

  // Phase 2: Departments without Employees
  departmentRows.forEach(depRow => {
    const departmentID = depRow.children[0].textContent.trim();
    const departmentName = depRow.children[1].textContent.trim();

    if (!matchedDepartmentIDs.has(departmentID)) {
      combinedRows.push({
        empID: "<span style='color:gray'>NULL</span>",
        empName: "<span style='color:gray'>NULL</span>",
        departmentName,
        empRow: null,
        depRow
      });
    }
  });

  let index = 0;

  function animateRow() {
    if (index >= combinedRows.length) return;

    const row = combinedRows[index];

    if (row.empRow) {
      row.empRow.style.transition = "background-color 0.3s";
      row.empRow.style.backgroundColor = "lightblue";
    }

    if (row.depRow) {
      row.depRow.style.transition = "background-color 0.3s";
      row.depRow.style.backgroundColor = "lightblue";
    }

    setTimeout(() => {
      if (row.empRow) row.empRow.style.backgroundColor = "lightgreen";
      if (row.depRow) row.depRow.style.backgroundColor = "lightgreen";

      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${row.empID}</td>
        <td>${row.empName}</td>
        <td>${row.departmentName}</td>
      `;
      newRow.style.opacity = "0";
      newRow.style.transition = "opacity 0.6s";
      resultTableBody.appendChild(newRow);

      setTimeout(() => {
        newRow.style.opacity = "1";
      }, 100);

      setTimeout(() => {
        if (row.empRow) row.empRow.style.backgroundColor = "";
        if (row.depRow) row.depRow.style.backgroundColor = "";
        index++;
        animateRow();
      }, SPEED);
    }, SPEED);
  }

  animateRow();
}

function showFullJoinStudentsCourses() {
  const speedInput = document.getElementById("speedControlStudents");
  const rawValue = parseInt(speedInput?.value || "800");
  const SPEED = 2100 - rawValue;

  const resultTableBody = document.getElementById("studentJoinBody");
  const resultContainer = document.getElementById("studentJoinResult");

  const studentRows = document.querySelectorAll("#fullJoinStudents tbody tr");
  const courseRows = document.querySelectorAll("#fullJoinCourses tbody tr");

  resultTableBody.innerHTML = "";
  resultContainer.style.display = "block";

  const matchedStudentIDs = new Set();
  const matchedCourseIDs = new Set();
  let combinedRows = [];

  // Phase 1: Students matched with Courses
  studentRows.forEach(studentRow => {
    const studentID = studentRow.children[0].textContent.trim();
    const studentName = studentRow.children[1].textContent.trim();
    let matchFound = false;

    courseRows.forEach(courseRow => {
      const courseStudentID = courseRow.children[0].textContent.trim();
      const courseName = courseRow.children[1].textContent.trim();

      if (studentID === courseStudentID) {
        combinedRows.push({
          studentID,
          studentName,
          courseName,
          studentRow,
          courseRow
        });
        matchFound = true;
        matchedCourseIDs.add(courseStudentID);
      }
    });

    if (!matchFound) {
      combinedRows.push({
        studentID,
        studentName,
        courseName: "<span style='color:gray'>NULL</span>",
        studentRow,
        courseRow: null
      });
    }

    matchedStudentIDs.add(studentID);
  });

  // Phase 2: Courses without matching Students
  courseRows.forEach(courseRow => {
    const courseStudentID = courseRow.children[0].textContent.trim();
    const courseName = courseRow.children[1].textContent.trim();

    if (!matchedStudentIDs.has(courseStudentID)) {
      combinedRows.push({
        studentID: "<span style='color:gray'>NULL</span>",
        studentName: "<span style='color:gray'>NULL</span>",
        courseName,
        studentRow: null,
        courseRow
      });
    }
  });

  let index = 0;

  function animateRow() {
    if (index >= combinedRows.length) return;

    const row = combinedRows[index];

    if (row.studentRow) {
      row.studentRow.style.transition = "background-color 0.3s";
      row.studentRow.style.backgroundColor = "lightblue";
    }

    if (row.courseRow) {
      row.courseRow.style.transition = "background-color 0.3s";
      row.courseRow.style.backgroundColor = "lightblue";
    }

    setTimeout(() => {
      if (row.studentRow) row.studentRow.style.backgroundColor = "lightgreen";
      if (row.courseRow) row.courseRow.style.backgroundColor = "lightgreen";

      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${row.studentID}</td>
        <td>${row.studentName}</td>
        <td>${row.courseName}</td>
      `;
      newRow.style.opacity = "0";
      newRow.style.transition = "opacity 0.6s";
      resultTableBody.appendChild(newRow);

      setTimeout(() => {
        newRow.style.opacity = "1";
      }, 100);

      setTimeout(() => {
        if (row.studentRow) row.studentRow.style.backgroundColor = "";
        if (row.courseRow) row.courseRow.style.backgroundColor = "";
        index++;
        animateRow();
      }, SPEED);
    }, SPEED);
  }

  animateRow();
}

function showCrossJoin() {
  const speedInput = document.getElementById("crossJoinSpeed");
  const rawValue = parseInt(speedInput?.value || "800");
  const SPEED = 2100 - rawValue;

  const resultTableBody = document.getElementById("crossJoinResultBody");
  const resultContainer = document.getElementById("crossJoinResultContainer");

  const studentRows = document.querySelectorAll("#crossJoinStudents tbody tr");
  const courseRows = document.querySelectorAll("#crossJoinCourses tbody tr");

  resultTableBody.innerHTML = "";
  resultContainer.style.display = "block";

  let combinedRows = [];

  // Cross Join: Every student with every course
  studentRows.forEach(studentRow => {
    const studentName = studentRow.children[1].textContent.trim();

    courseRows.forEach(courseRow => {
      const courseName = courseRow.children[1].textContent.trim();

      combinedRows.push({
        studentName,
        courseName,
        studentRow,
        courseRow
      });
    });
  });

  let index = 0;

  function animateRow() {
    if (index >= combinedRows.length) return;

    const row = combinedRows[index];

    // Highlight rows
    row.studentRow.style.transition = "background-color 0.3s";
    row.studentRow.style.backgroundColor = "lightblue";
    row.courseRow.style.transition = "background-color 0.3s";
    row.courseRow.style.backgroundColor = "lightblue";

    setTimeout(() => {
      row.studentRow.style.backgroundColor = "lightgreen";
      row.courseRow.style.backgroundColor = "lightgreen";

      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${row.studentName}</td>
        <td>${row.courseName}</td>
      `;
      newRow.style.opacity = "0";
      newRow.style.transition = "opacity 0.6s";
      resultTableBody.appendChild(newRow);

      setTimeout(() => {
        newRow.style.opacity = "1";
      }, 100);

      setTimeout(() => {
        row.studentRow.style.backgroundColor = "";
        row.courseRow.style.backgroundColor = "";
        index++;
        animateRow();
      }, SPEED);
    }, SPEED);
  }

  animateRow();
}


function showCrossJoinCrossOnly() {
  const speedInput = document.getElementById("crossOnlySpeed");
  const rawValue = parseInt(speedInput?.value || "800");
  const SPEED = 2100 - rawValue;

  const resultTableBody = document.getElementById("crossOnlyResultBody");
  const resultContainer = document.getElementById("crossOnlyResultContainer");

  // ✅ Updated table selectors
  const studentRows = document.querySelectorAll("#crossJoinStudents2 tbody tr");
  const courseRows = document.querySelectorAll("#crossJoinCourses2 tbody tr");

  resultTableBody.innerHTML = "";
  resultContainer.style.display = "block";

  let combinedRows = [];

  // Cross Join logic: Every student with every course
  studentRows.forEach(studentRow => {
    const studentName = studentRow.children[1].textContent.trim();

    courseRows.forEach(courseRow => {
      const courseName = courseRow.children[1].textContent.trim();

      combinedRows.push({
        studentName,
        courseName,
        studentRow,
        courseRow
      });
    });
  });

  let index = 0;

  function animateRow() {
    if (index >= combinedRows.length) return;

    const row = combinedRows[index];

    // Highlight matched rows
    row.studentRow.style.transition = "background-color 0.3s";
    row.studentRow.style.backgroundColor = "lightblue";
    row.courseRow.style.transition = "background-color 0.3s";
    row.courseRow.style.backgroundColor = "lightblue";

    setTimeout(() => {
      row.studentRow.style.backgroundColor = "lightgreen";
      row.courseRow.style.backgroundColor = "lightgreen";

      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${row.studentName}</td>
        <td>${row.courseName}</td>
      `;
      newRow.style.opacity = "0";
      newRow.style.transition = "opacity 0.6s";
      resultTableBody.appendChild(newRow);

      setTimeout(() => {
        newRow.style.opacity = "1";
      }, 100);

      setTimeout(() => {
        row.studentRow.style.backgroundColor = "";
        row.courseRow.style.backgroundColor = "";
        index++;
        animateRow();
      }, SPEED);
    }, SPEED);
  }

  animateRow();
}



function showGroupBy() {
  const speedInput = document.getElementById("crossOnlySpeed");
  const rawValue = parseInt(speedInput?.value || "800");
  const SPEED = 2100 - rawValue;

  const resultTableBody = document.getElementById("crossOnlyResultBody");
  const resultContainer = document.getElementById("crossOnlyResultContainer");

  // ✅ Updated table selectors
  const studentRows = document.querySelectorAll("#crossJoinStudents2 tbody tr");
  const courseRows = document.querySelectorAll("#crossJoinCourses2 tbody tr");

  resultTableBody.innerHTML = "";
  resultContainer.style.display = "block";

  let combinedRows = [];

  // Cross Join logic: Every student with every course
  studentRows.forEach(studentRow => {
    const studentName = studentRow.children[1].textContent.trim();

    courseRows.forEach(courseRow => {
      const courseName = courseRow.children[1].textContent.trim();

      combinedRows.push({
        studentName,
        courseName,
        studentRow,
        courseRow
      });
    });
  });

  let index = 0;

  function animateRow() {
    if (index >= combinedRows.length) return;

    const row = combinedRows[index];

    // Highlight matched rows
    row.studentRow.style.transition = "background-color 0.3s";
    row.studentRow.style.backgroundColor = "lightblue";
    row.courseRow.style.transition = "background-color 0.3s";
    row.courseRow.style.backgroundColor = "lightblue";

    setTimeout(() => {
      row.studentRow.style.backgroundColor = "lightgreen";
      row.courseRow.style.backgroundColor = "lightgreen";

      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${row.studentName}</td>
        <td>${row.courseName}</td>
      `;
      newRow.style.opacity = "0";
      newRow.style.transition = "opacity 0.6s";
      resultTableBody.appendChild(newRow);

      setTimeout(() => {
        newRow.style.opacity = "1";
      }, 100);

      setTimeout(() => {
        row.studentRow.style.backgroundColor = "";
        row.courseRow.style.backgroundColor = "";
        index++;
        animateRow();
      }, SPEED);
    }, SPEED);
  }

  animateRow();
}

function showGroupBy() {
  const speedInput = document.getElementById("groupBySpeed");
  const rawValue = parseInt(speedInput?.value || "800");
  const SPEED = 2100 - rawValue;

  const resultTableBody = document.getElementById("groupByResultBody");
  const resultContainer = document.getElementById("groupByResultContainer");

  // Get rows from tables
  const enrollmentRows = document.querySelectorAll("#groupByEnrollments tbody tr");
  const courseRows = document.querySelectorAll("#groupByCourses tbody tr");

  // Map CourseID to CourseName
  const courseMap = {};
  courseRows.forEach(row => {
    const courseID = row.children[0].textContent.trim();
    const courseName = row.children[1].textContent.trim();
    courseMap[courseID] = {
      name: courseName,
      row: row
    };
  });

  // Count students per course
  const courseCount = {};
  const animationSteps = [];

  enrollmentRows.forEach(enrollRow => {
    const studentID = enrollRow.children[0].textContent.trim();
    const courseID = enrollRow.children[1].textContent.trim();

    const courseName = courseMap[courseID]?.name || "Unknown";
    if (!courseCount[courseName]) {
      courseCount[courseName] = 0;
    }
    courseCount[courseName] += 1;

    animationSteps.push({
      enrollRow,
      courseRow: courseMap[courseID]?.row,
      courseName
    });
  });

  resultTableBody.innerHTML = "";
  resultContainer.style.display = "block";

  let index = 0;

  function animateRow() {
    if (index >= animationSteps.length) {
      // Final display of grouped results
      for (const [courseName, count] of Object.entries(courseCount)) {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${courseName}</td>
          <td>${count}</td>
        `;
        resultTableBody.appendChild(row);
      }
      return;
    }

    const step = animationSteps[index];

    step.enrollRow.style.transition = "background-color 0.3s";
    step.enrollRow.style.backgroundColor = "lightblue";

    if (step.courseRow) {
      step.courseRow.style.transition = "background-color 0.3s";
      step.courseRow.style.backgroundColor = "lightblue";
    }

    setTimeout(() => {
      step.enrollRow.style.backgroundColor = "lightgreen";
      if (step.courseRow) step.courseRow.style.backgroundColor = "lightgreen";

      setTimeout(() => {
        step.enrollRow.style.backgroundColor = "";
        if (step.courseRow) step.courseRow.style.backgroundColor = "";
        index++;
        animateRow();
      }, SPEED);
    }, SPEED);
  }

  animateRow();
}


function showGroupByPerks() {
  const speedInput = document.getElementById("groupBySpeed");
  const rawValue = parseInt(speedInput?.value || "800");
  const SPEED = 2100 - rawValue;

  const resultTableBody = document.getElementById("groupByResultBody2");
  const resultContainer = document.getElementById("groupByResultContainer2");

  // Get rows from both tables
  const employeeRows = document.querySelectorAll("#groupByEmployees tbody tr");
  const perkRows = document.querySelectorAll("#groupByEmployeePerks tbody tr");

  // Map EmpID to EmployeeName
  const empMap = {};
  employeeRows.forEach(row => {
    const empID = row.children[0].textContent.trim();
    const empName = row.children[1].textContent.trim();
    empMap[empID] = {
      name: empName,
      row: row
    };
  });

  // Count perks per employee
  const empPerkCount = {};
  const animationSteps = [];

  perkRows.forEach(perkRow => {
    const empID = perkRow.children[0].textContent.trim();
    const employeeName = empMap[empID]?.name || "Unknown";

    if (!empPerkCount[employeeName]) {
      empPerkCount[employeeName] = 0;
    }
    empPerkCount[employeeName] += 1;

    animationSteps.push({
      perkRow,
      employeeRow: empMap[empID]?.row,
      employeeName
    });
  });

  resultTableBody.innerHTML = "";
  resultContainer.style.display = "block";

  let index = 0;

  function animateRow() {
    if (index >= animationSteps.length) {
      // Final display of grouped results
      for (const [employeeName, count] of Object.entries(empPerkCount)) {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${employeeName}</td>
          <td>${count}</td>
        `;
        resultTableBody.appendChild(row);
      }
      return;
    }

    const step = animationSteps[index];

    step.perkRow.style.transition = "background-color 0.3s";
    step.perkRow.style.backgroundColor = "lightblue";

    if (step.employeeRow) {
      step.employeeRow.style.transition = "background-color 0.3s";
      step.employeeRow.style.backgroundColor = "lightblue";
    }

    setTimeout(() => {
      step.perkRow.style.backgroundColor = "lightgreen";
      if (step.employeeRow) step.employeeRow.style.backgroundColor = "lightgreen";

      setTimeout(() => {
        step.perkRow.style.backgroundColor = "";
        if (step.employeeRow) step.employeeRow.style.backgroundColor = "";
        index++;
        animateRow();
      }, SPEED);
    }, SPEED);
  }

  animateRow();
}







(function() {
  "use strict";

 
  const headerToggleBtn = document.querySelector('.header-toggle');
  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);


  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });
  });

  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  // Wait for the DOM content to load
document.addEventListener("DOMContentLoaded", function() {
  // Get DOM elements
  const loginForm = document.getElementById('login-form');
  const loginSection = document.getElementById('login-section');
  const quizSection = document.getElementById('quiz-section');
  const quizForm = document.getElementById('quiz-form');
  const resultDiv = document.getElementById('result');

  // Basic login validation (hardcoded demo credentials)
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const userpass = document.getElementById('userpass').value;
    // Example: username and password both "admin"
    if (username === 'admin' && userpass === 'admin') {
      // Hide login, show quiz
      loginSection.classList.add('d-none');
      quizSection.classList.remove('d-none');
    } else {
      alert('Invalid credentials. Please try again.');
    }
  });

  // Handle quiz submission
  quizForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let score = 0;
    // Answer Key: For question 1, correct answer is "B"
    const q1 = document.querySelector('input[name="q1"]:checked');
    if (q1 && q1.value === 'B') {
      score++;
    }
    // Extend for additional questions if added...

    resultDiv.innerHTML = `<h4>Your score is ${score} out of 1.</h4>`;
  });
});

  
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }


  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items').split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  new PureCounter();

  document.addEventListener("DOMContentLoaded", function () {
    const currentPage = window.location.pathname.split("/").pop(); 
    const dropdown = document.querySelector(".dropdown");
    const links = dropdown.querySelectorAll("ul li a");

    links.forEach(link => {
      if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
        dropdown.classList.add("open");
      }
    });
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    const showJoinButton = document.getElementById("showJoinButton");
    
    if (showJoinButton) {
        showJoinButton.addEventListener("click", showInnerJoinResult);
        console.log(" Button event listener attached!");
    } else {
        console.log(" Button not found!");
    }
});

})();
