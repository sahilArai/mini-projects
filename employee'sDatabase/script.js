(async function () {
  let data = await fetch("data.json");
  let response = await data.json();
  let employees = response;

  let selectedEmployee = employees[0];
  let selectedEmployeeId = employees[0].id;
  console.log(selectedEmployee);

  let unorderdList = document.querySelector(".unorderdList");
  let employeeInfo = document.querySelector(".employeeInfo");

  let renderEmployee = () => {
    employees.forEach((emp) => {
      let list = document.createElement("li")
      list.innerHTML = `
        ${emp.firstName} ${emp.lastName} <span>❌</span>
      `
      list.setAttribute("id",emp.id)
      list.classList.add("list")
      unorderdList.appendChild(list)
    });
  };
  renderEmployee();

  let selectEmployee = () => {
   employees.forEach(emp => {
    if (emp.id == selectedEmployeeId) {
        selectedEmployee = emp
        
    }
   })
  }

  let renderEmployeeInfo = () => {
    unorderdList.addEventListener("click", (e) => {
        if (e.target.id != selectedEmployeeId) {
            selectedEmployeeId = e.target.id;
            employeeInfo.innerHTML = ""
            selectEmployee()            
            employeeInfo.innerHTML = `
                <img src=${selectedEmployee.imageUrl} alt="image">
                       <h1>${selectedEmployee.firstName} ${selectedEmployee.lastName}  </h1>
                       <div class="details">
                           <p>age : ${selectedEmployee.age}</p>
                           <p>DOB : ${selectedEmployee.dob}</p>
                           <p>Contact : ${selectedEmployee.contactNumber}</p>
                           <p>E-mail : ${selectedEmployee.email}</p>
                           <p>Address : ${selectedEmployee.address}</p>
                           <p>Salary : ${selectedEmployee.salary}</p>
                       </div>
            `
        }
        
    })
  }
  renderEmployeeInfo()

  let addEmployee = () => {
    let addEmployeeBtn = document.querySelector(".addEmployeeBtn")
    let formContainer = document.querySelector(".formContainer")
    let addEmployeeForm = document.querySelector(".addEmployeeForm")
    let close = document.querySelector(".close")

    addEmployeeBtn.addEventListener("click", () => {
      formContainer.style.display = "flex"
    })
    close.addEventListener("click", () => {
      formContainer.style.display = "none"
    })
    addEmployeeForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const formData = new FormData(addEmployeeForm);
      const values = [...formData.entries()];
      let empData = {};
      values.forEach((val) => {
        empData[val[0]] = val[1]
        
      })
       empData.id = employees[employees.length - 1].id + 1;
       empData.age = new Date().getFullYear() - parseInt(empData.dob.slice(0, 4), 10);
       empData.imageUrl = empData.imageUrl || "https:cdn-icons-png.flaticon.com/512/0/93.png";
       employees.push(empData);
       renderEmployee();
       addEmployeeForm.reset();
       formContainer.style.display = "none";
      
    })

  }
  addEmployee()

})();
