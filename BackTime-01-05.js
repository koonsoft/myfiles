(function () {
 const box = document.createElement("div");
 box.id = "Calcs";
 box.style.cssText='width: 5rem;display: grid;position:fixed;top:0;right:0;z-index:99999999;overflow:hidden;;background-color:white;';
 const startInput = document.createElement("input");
 startInput.type = "text";
 startInput.placeholder = "انطلاق/وصول HH:MM:SS";
 startInput.style.cssText='width:88%;text-align:center;';
 const durationInput = document.createElement("input");
 durationInput.type = "text";
 durationInput.placeholder = "المدة HH:MM:SS";
 durationInput.style.cssText='width:88%;text-align:center;';
 // NEW CHECKBOX
 const reverseLabel = document.createElement("label");
 reverseLabel.style.cssText = "font-size:11px;display:flex;align-items:center;gap:3px;width:88%;";
 const reverseCheck = document.createElement("input");
 reverseCheck.type = "checkbox";
 reverseLabel.appendChild(reverseCheck);
 reverseLabel.appendChild(document.createTextNode("الإطلاق"));
 const button = document.createElement("button");
 button.textContent = "احسب";
 const result = document.createElement("div");
 result.style.cssText= "width:88%;margin-top:1px;text-align: center;";
 function normalize(h,m,s){
     s = (s + 60) % 60;
     m = (m + 60) % 60;
     h = (h + 24) % 24;
     return [
         String(h).padStart(2,"0"),
         String(m).padStart(2,"0"),
         String(s).padStart(2,"0")
     ].join(":");
 }
  // restore saved values
startInput.value = localStorage.getItem("bt_start") || "";
durationInput.value = localStorage.getItem("bt_duration") || "";
reverseCheck.checked = localStorage.getItem("bt_mode") === "1";
result.textContent = localStorage.getItem("bt_result") || "";
 button.onclick = () => {
     const t1 = startInput.value.split(":").map(Number);
     const t2 = durationInput.value.split(":").map(Number);
     const [h1, m1, s1] = t1;
     const [h2, m2, s2] = t2;
     if ([h1,m1,s1,h2,m2,s2].some(isNaN)) { result.textContent = "خطأ في الإدخال";return; }
     let total1 = h1*3600 + m1*60 + s1;let total2 = h2*3600 + m2*60 + s2;
     let finalSeconds;
     if (reverseCheck.checked) {// Arrival - Duration = Launch
         finalSeconds = total1 - total2;
     } else {// Start + Duration = Arrival
         finalSeconds = total1 + total2;
     }
     finalSeconds = ((finalSeconds % 86400) + 86400) % 86400;
     let hours = Math.floor(finalSeconds / 3600);
     let minutes = Math.floor((finalSeconds % 3600) / 60);
     let seconds = finalSeconds % 60;
     result.textContent = normalize(hours, minutes, seconds);
// save values
localStorage.setItem("bt_start", startInput.value);
localStorage.setItem("bt_duration", durationInput.value);
localStorage.setItem("bt_mode", reverseCheck.checked ? "1" : "0");
localStorage.setItem("bt_result", result.textContent);
 };
 box.appendChild(startInput);
 box.appendChild(durationInput);
 box.appendChild(reverseLabel);
 box.appendChild(button);
 box.appendChild(result);
 document.body.appendChild(box);
})();