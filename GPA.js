window.onload = function() {
    document.getElementById("grade1").focus();
  };
  
  function gradeToPoints(g){
    if(!g) return null;
    g = g.toUpperCase().trim();
  
    const base = {A:4, B:3, C:2, D:1, F:0};
  
    if(base[g] !== undefined) return base[g];
  
    let m = g.match(/^([A-DF])([+-])$/);
    if(m){
      let pts = base[m[1]];
      if(m[1] === "F") return 0;
      pts += (m[2] === "+") ? 0.3 : -0.3;
      return Math.max(0, Math.min(4, pts));
    }
  
    if(g === "A+") return 4;
  
    return null;
  }
  
  function calculateGPA(){
    let totalHrs = 0;
    let totalPts = 0;
    let count = 0;
  
    for(let i=1;i<=5;i++){
      let g = document.getElementById("grade"+i).value;
      let h = document.getElementById("hours"+i).value;
  
      if(g || h){
        let pts = gradeToPoints(g);
        let hrs = parseFloat(h);
  
        if(!pts && pts!==0){
          document.getElementById("gpaResult").innerText = "Invalid grade: " + g;
          return;
        }
  
        if(!hrs || hrs <= 0){
          document.getElementById("gpaResult").innerText = "Invalid hours";
          return;
        }
  
        totalPts += pts * hrs;
        totalHrs += hrs;
        count++;
      }
    }
  
    if(count < 2){
      document.getElementById("gpaResult").innerText = "Enter at least 2 entries";
      return;
    }
  
    let gpa = totalPts / totalHrs;
    document.getElementById("gpaResult").innerText = "GPA: " + gpa.toFixed(2);
  }
  
  function resetGPA(){
    for(let i=1;i<=5;i++){
      document.getElementById("grade"+i).value = "";
      document.getElementById("hours"+i).value = "";
    }
    document.getElementById("gpaResult").innerText = "";
    document.getElementById("grade1").focus();
  }
  