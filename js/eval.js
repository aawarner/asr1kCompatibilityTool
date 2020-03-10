/*Copyright (c) 2019 Cisco and/or its affiliates.
This software is licensed to you under the terms of the Cisco Sample
Code License, Version 1.1 (the "License"). You may obtain a copy of the
License at
               https://developer.cisco.com/docs/licenses
All use of the material herein must be in accordance with the terms of
the License. All rights not expressly granted by the License are
reserved. Unless required by applicable law or agreed to separately in
writing, software distributed under the License is distributed on an "AS
IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
or implied.*/

function checkChassis() {
    document.getElementById("message").innerHTML = "";
    var chassis = document.getElementById('chassis').value;
    localStorage.setItem("platform", chassis);
    if (chassis == "ASR1001-X" || chassis == "ASR1002-X") {
        location = "asr1000X.html";
    }
    else if (chassis == "ASR1002-HX") {
        location = "asr1000HX.html";
    }
    else if (chassis == "ASR1001-HX") {
        document.getElementById("message").innerHTML = "ASR1001-HX is a fixed platform. Nothing to check!";
    }
    else {
        location = "cardCheck.html";
    }
    return false;
}

function checkCards() {
    document.getElementById("docspace").innerHTML = "";
    document.getElementById("table").innerHTML = "";
    var chassis = localStorage.getItem('platform');
    var rp = document.getElementById('rp').value;
    var esp = document.getElementById('esp').value;
    var xip = document.getElementById('xip').value;
    var felc = document.getElementById('felc').value;
    if ((chassis == "ASR1004" && esp == "ESP100") || (chassis == "ASR1004" && esp == "ESP200")) {
        document.getElementById("message").innerHTML = esp+" is incompatible with "+ chassis;
        espdocs();
        clearfail();
    }
    else if ((chassis == "ASR1004" && rp == "RP3") || (chassis == "ASR1006" && rp == "RP3")) {
        document.getElementById("message").innerHTML = rp + " is incompatible with " + chassis;
        rpdocs();
        clearfail();
    }
    else if (esp == "ESP20" && xip == "SIP40") {
        document.getElementById("message").innerHTML = esp + " is incompatible with " + xip;
        espdocs();
        clearfail();
    }
    else if ((chassis == "ASR1004" && xip == "MIP100") || (chassis == "ASR1006" && xip == "MIP100")) {
        document.getElementById("message").innerHTML = xip + " is incompatible with " + chassis;
        fixedline();
        clearfail();
    }
    else if ((xip == "MIP100" && esp == "ESP20") || (xip == "MIP100" && esp == "ESP40")) {
        document.getElementById("message").innerHTML = xip + " is incompatible with " + esp;
        fixedline();
        clearfail();
    }
    else if ((rp == "RP1" && esp == "ESP40") || (rp == "RP1" && esp == "ESP100") || (rp == "RP1" && esp == "ESP200")) {
        document.getElementById("message").innerHTML = rp + " is incompatible with " + esp;
        rpdocs();
        clearfail();
    }
    else if (chassis == "ASR1006" && esp == "ESP200") {
        document.getElementById("message").innerHTML = esp+" is incompatible with "+ chassis;
        espdocs();
        clearfail();
    }
    else if ((chassis == "ASR1006-X" && esp =="ESP20") || (chassis == "ASR1006-X" && esp =="ESP200")) {
        document.getElementById("message").innerHTML = esp+" is incompatible with "+ chassis;
        espdocs();
        clearfail();
    }
    else if (chassis == "ASR1006-X" && xip =="SIP10") {
        document.getElementById("message").innerHTML = xip+" is incompatible with "+ chassis;
        asrdocs();
        clearfail();
    }
    else if (chassis == "ASR1009-X" && esp =="ESP20") {
        document.getElementById("message").innerHTML = esp+" is incompatible with "+ chassis;
        espdocs();
        clearfail();
    }
    else if (chassis == "ASR1009-X" && xip =="SIP10") {
        document.getElementById("message").innerHTML = xip+" is incompatible with "+ chassis;
        asrdocs();
        clearfail();
    }
    else if (chassis == "ASR1013" && esp =="ESP20") {
        document.getElementById("message").innerHTML = esp+" is incompatible with "+ chassis;
        espdocs();
        clearfail();
    }
    else if (chassis == "ASR1013" && xip =="SIP10") {
        document.getElementById("message").innerHTML = xip+" is incompatible with "+ chassis;
        asrdocs();
        clearfail();
    }
    else if ((felc == "ASR1000-2T+20X1GE" && rp =="RP1") || (felc == "ASR1000-6TGE" && rp =="RP1")) {
        document.getElementById("message").innerHTML = felc+" is incompatible with "+ rp;
        fixedline();
        clearfail();
    }
    else if (felc == "ASR1000-2T+20X1GE" && esp =="ESP20") {
        document.getElementById("message").innerHTML = felc+" is incompatible with "+ esp;
        fixedline();
        clearfail();
    }
    else if (felc == "ASR1000-6TGE" && esp =="ESP20") {
        document.getElementById("message").innerHTML = felc+" is incompatible with "+ esp;
        fixedline();
        clearfail();
    }
    else if (xip =="MIP100") {
        createEPATable();
        document.getElementById("success").innerHTML = chassis + " Configuration is Supported";
        document.getElementById("tablecap").innerHTML = chassis + " Supported Ethernet Port Adapters";
        clearsuccess();
    } 
    else if (xip =="SIP40") {
        createSIP40Table();
        document.getElementById("success").innerHTML = chassis + " Configuration is Supported";
        document.getElementById("tablecap").innerHTML = chassis + " Supported Half-Height SPA's";
        clearsuccess();
    } 
    else {
        createTable();
        document.getElementById("success").innerHTML = chassis + " Configuration is Supported";
        document.getElementById("tablecap").innerHTML = chassis + " Supported Half-Height SPA's";
        clearsuccess();
    } 
    return false;
}

function platform() {
    var chassis = localStorage.getItem('platform');
    document.getElementById("platform").innerHTML = "Choose cards for " + chassis;
}

function createTable() { 
    var tbl = document.getElementById("table");
    if (tbl.rows.length == 0) {
        let spas = [
            { PID: "SPA-1X10GE-L-V2", Description: "Cisco 1-Port 10GE LAN-PHY"},
            { PID: "SPA-1XCHSTM1/OC3", Description: "1-port Channelized STM-1/OC-3c to DS0"},
            { PID: "SPA-1XOC12-POS", Description: "1-port OC12/STM4 POS"},
            { PID: "SPA-2XOC12-POS", Description: "2-port OC12/STM4 POS"},
            { PID: "SPA-4XOC12-POS", Description: "4-port OC-12/STM-4 POS"},
            { PID: "SPA-1XOC3-ATM-V2", Description: "1-port OC-3c/STM-1 ATM"},
            { PID: "SPA-2X1GE-V2", Description: "Cisco 2-Port Gigabit Ethernet"},
            { PID: "SPA-2XCT3/DS0", Description: "2-port Channelized T3 to DS0"},
            { PID: "SPA-2XOC3-POS", Description: "2-port OC3/STM1 POS"},
            { PID: "SPA-8XOC3-POS", Description: "8-port OC-3/STM-1 POS"},
            { PID: "SPA-1XOC48POS/RPR", Description: "1-port OC48/STM16 POS/RPR"},
            { PID: "SPA-2XOC48POS/RPR", Description: "2-port OC48/STM16 POS/RPR"},
            { PID: "SPA-2XT3/E3", Description: "2-port Clear Channel T3/E3"},
            { PID: "SPA-3XOC3-ATM-V2", Description: "3-port OC-3c/STM-1 ATM"},
            { PID: "SPA-4X1FE-TX-V2", Description: "Cisco 4-Port Fast Ethernet (TX)"},
            { PID: "SPA-4XCT3/DS0", Description: "4-port Channelized T3 to DS0"},
            { PID: "SPA-4XOC3-POS", Description: "4-port OC3/STM1 POS"},
            { PID: "SPA-4XOC48POS/RPR", Description: "4-port OC48/STM16 POS/RPR Shared Port Adapters"},
            { PID: "SPA-OC192POS-XFP", Description: "1-port OC192/STM64 POS/RPR XFP Optics"},
            { PID: "SPA-4XT-SERIAL", Description: "Cisco 4-port serial SPA"},
            { PID: "SPA-4XT3/E3", Description: "4-port Clear Channel T3/E3"},
            { PID: "SPA-5X1GE-V2", Description: "Cisco 5-Port Gigabit Ethernet"},
            { PID: "SPA-8X1FE-TX-V2", Description: "Cisco 8-Port Fast Ethernet (TX)"},
            { PID: "SPA-8X1GE-V2", Description: "Cisco 8-Port Gigabit Ethernet"},
            { PID: "SPA-8XCHT1/E1", Description: "8-port Channelized T1/E1 to DS0"},
            { PID: "SPA-1XOC12-ATM-V2", Description: "1-port OC12 STM"},
            { PID: "SPA-DSP", Description: "Digital Signal Processor SPA"},
            { PID: "SPA-1X10GE-WL-V2", Description: "Cisco 1-port 10GE LAN/WAN-PHY"},
            { PID: "SPA-2CHT3-CE-ATM", Description: "2-Port Channelized T3/E3 ATM and Circuit Emulation SPA"},
            { PID: "SPA-4XOC3-POS-V2", Description: "4-port OC-3/STM-1 POS"},
            { PID: "SPA-2X1GE-SYNCE", Description: "Cisco Synchronous Ethernet SPA"},
            { PID: "SPA-24CHT1-CE-ATM", Description: "Cisco 24 Port T1/E1/J1 Circuit Emulation SPA"},
            { PID: "SPA-1CHSTM1/OC3V2", Description: "1-Port Channelized OC-3/STM-1 SPA, Version 2"},
            { PID: "SPA-1XOC12-POS-V2", Description: "1-Port OC-12C/STM-4 Multirate POS SPA (license)"},
            { PID: "SPA-2XOC3-POS-V2", Description: "2-Port OC-3C/STM-1 POS SPA (license)"},
            { PID: "SPA-2XCT3/DS0-V2", Description: "2-Port Channelized T3 SPA, Version 2"},
            { PID: "SPA-4XCT3/DS0-V2", Description: "4-Port Channelized T3 SPA, Version 2"},
            { PID: "SPA-2XT3/E3-V2", Description: "2-Port Clear Channel T3/E3 SPA, Version 2"},
            { PID: "SPA-4XT3/E3-V2", Description: "4-Port Clear Channel T3/E3 SPA, Version 2"},
            { PID: "SPA-8XCHT1/E1-V2", Description: "8-Port Channelized T1/E1 SPA, Version 2"},
          ];
          function generateTableHead(table, data) {
            let thead = table.createTHead();
            let row = thead.insertRow();
            for (let key of data) {
              let th = document.createElement("th");
              let text = document.createTextNode(key);
              th.appendChild(text);
              row.appendChild(th);
            }
          }
          function generateTable(table, data) {
            for (let element of data) {
              let row = table.insertRow();
              for (key in element) {
                let cell = row.insertCell();
                let text = document.createTextNode(element[key]);
                cell.appendChild(text);
              }
            }
          }

          let table = document.querySelector("table");
          let data = Object.keys(spas[0]);
          generateTable(table, spas);
          generateTableHead(table, data);
          table.removeAttribute("hidden");
    }
    return false;
}

function createSIP40Table() { 
    var tbl = document.getElementById("table");
    if (tbl.rows.length == 0) {
        let spas = [
            { PID: "SPA-1X10GE-L-V2", Description: "Cisco 1-Port 10GE LAN-PHY"},
            { PID: "SPA-1XCHSTM1/OC3", Description: "1-port Channelized STM-1/OC-3c to DS0"},
            { PID: "SPA-1XOC12-POS", Description: "1-port OC12/STM4 POS"},
            { PID: "SPA-2XOC12-POS", Description: "2-port OC12/STM4 POS"},
            { PID: "SPA-4XOC12-POS", Description: "4-port OC-12/STM-4 POS"},
            { PID: "SPA-1XOC3-ATM-V2", Description: "1-port OC-3c/STM-1 ATM"},
            { PID: "SPA-2X1GE-V2", Description: "Cisco 2-Port Gigabit Ethernet"},
            { PID: "SPA-2XCT3/DS0", Description: "2-port Channelized T3 to DS0"},
            { PID: "SPA-2XOC3-POS", Description: "2-port OC3/STM1 POS"},
            { PID: "SPA-8XOC3-POS", Description: "8-port OC-3/STM-1 POS"},
            { PID: "SPA-1XOC48POS/RPR", Description: "1-port OC48/STM16 POS/RPR"},
            { PID: "SPA-2XOC48POS/RPR", Description: "2-port OC48/STM16 POS/RPR"},
            { PID: "SPA-2XT3/E3", Description: "2-port Clear Channel T3/E3"},
            { PID: "SPA-3XOC3-ATM-V2", Description: "3-port OC-3c/STM-1 ATM"},
            { PID: "SPA-4X1FE-TX-V2", Description: "Cisco 4-Port Fast Ethernet (TX)"},
            { PID: "SPA-4XCT3/DS0", Description: "4-port Channelized T3 to DS0"},
            { PID: "SPA-4XOC3-POS", Description: "4-port OC3/STM1 POS"},
            { PID: "SPA-4XOC48POS/RPR", Description: "4-port OC48/STM16 POS/RPR Shared Port Adapters"},
            { PID: "SPA-OC192POS-XFP", Description: "1-port OC192/STM64 POS/RPR XFP Optics"},
            { PID: "SPA-4XT-SERIAL", Description: "Cisco 4-port serial SPA"},
            { PID: "SPA-4XT3/E3", Description: "4-port Clear Channel T3/E3"},
            { PID: "SPA-5X1GE-V2", Description: "Cisco 5-Port Gigabit Ethernet"},
            { PID: "SPA-8X1FE-TX-V2", Description: "Cisco 8-Port Fast Ethernet (TX)"},
            { PID: "SPA-8X1GE-V2", Description: "Cisco 8-Port Gigabit Ethernet"},
            { PID: "SPA-8XCHT1/E1", Description: "8-port Channelized T1/E1 to DS0"},
            { PID: "SPA-1XOC12-ATM-V2", Description: "1-port OC12 STM"},
            { PID: "SPA-DSP", Description: "Digital Signal Processor SPA"},
            { PID: "SPA-1X10GE-WL-V2", Description: "Cisco 1-port 10GE LAN/WAN-PHY"},
            { PID: "SPA-2CHT3-CE-ATM", Description: "2-Port Channelized T3/E3 ATM and Circuit Emulation SPA"},
            { PID: "SPA-4XOC3-POS-V2", Description: "4-port OC-3/STM-1 POS"},
            { PID: "SPA-2X1GE-SYNCE", Description: "Cisco Synchronous Ethernet SPA"},
            { PID: "SPA-8XT3/E3", Description: "Cisco 8-Port Clear Channel T3/E3 Shared Port Adapter"},
            { PID: "SPA-24CHT1-CE-ATM", Description: "Cisco 24 Port T1/E1/J1 Circuit Emulation SPA"},
            { PID: "SPA-1CHSTM1/OC3V2", Description: "1-Port Channelized OC-3/STM-1 SPA, Version 2"},
            { PID: "SPA-1XOC12-POS-V2", Description: "1-Port OC-12C/STM-4 Multirate POS SPA (license)"},
            { PID: "SPA-2XOC3-POS-V2", Description: "2-Port OC-3C/STM-1 POS SPA (license)"},
            { PID: "SPA-2XCT3/DS0-V2", Description: "2-Port Channelized T3 SPA, Version 2"},
            { PID: "SPA-4XCT3/DS0-V2", Description: "4-Port Channelized T3 SPA, Version 2"},
            { PID: "SPA-2XT3/E3-V2", Description: "2-Port Clear Channel T3/E3 SPA, Version 2"},
            { PID: "SPA-4XT3/E3-V2", Description: "4-Port Clear Channel T3/E3 SPA, Version 2"},
            { PID: "SPA-8XCHT1/E1-V2", Description: "8-Port Channelized T1/E1 SPA, Version 2"},
          ];
          function generateTableHead(table, data) {
            let thead = table.createTHead();
            let row = thead.insertRow();
            for (let key of data) {
              let th = document.createElement("th");
              let text = document.createTextNode(key);
              th.appendChild(text);
              row.appendChild(th);
            }
          }
          function generateTable(table, data) {
            for (let element of data) {
              let row = table.insertRow();
              for (key in element) {
                let cell = row.insertCell();
                let text = document.createTextNode(element[key]);
                cell.appendChild(text);
              }
            }
          }

          let table = document.querySelector("table");
          let data = Object.keys(spas[0]);
          generateTable(table, spas);
          generateTableHead(table, data);
          table.removeAttribute("hidden");
    }
    return false;
}

function createEPATable() { 
    var tbl = document.getElementById("table");
    if (tbl.rows.length == 0) {
        let spas = [
            { PID: "EPA-QSFP-1X100GE", Description: "Cisco ASR 1000 1x100GE QSFP Ethernet Port Adapter"},
            { PID: "EPA-1X100GE", Description: "Cisco ASR 1000 1x100GE Ethernet Port Adapter"},
            { PID: "EPA-2X40GE", Description: "Cisco ASR 1000 2x40GE Ethernet Port Adapter (Native QSFP)"},
            { PID: "EPA-1X40GE", Description: "Cisco ASR 1000 1x40GE Ethernet Port Adapter (2 physical QSFP ports - optional license to enable 2nd port)"},
            { PID: "EPA-CPAK-2X40GE", Description: "Cisco ASR 1000 2x40GE Ethernet Port Adapter (breakout cable)"},
            { PID: "EPA-10X10GE", Description: "Cisco ASR 1000 10x10GE Ethernet Port Adapter"},
            { PID: "EPA-18X1GE", Description: "Cisco ASR 1000 18x1GE Ethernet Port Adapter"},
          ];
          function generateTableHead(table, data) {
            let thead = table.createTHead();
            let row = thead.insertRow();
            for (let key of data) {
              let th = document.createElement("th");
              let text = document.createTextNode(key);
              th.appendChild(text);
              row.appendChild(th);
            }
          }
          function generateTable(table, data) {
            for (let element of data) {
              let row = table.insertRow();
              for (key in element) {
                let cell = row.insertCell();
                let text = document.createTextNode(element[key]);
                cell.appendChild(text);
              }
            }
          }

          let table = document.querySelector("table");
          let data = Object.keys(spas[0]);
          generateTable(table, spas);
          generateTableHead(table, data);
          table.removeAttribute("hidden");
    }
    return false;
}

function rpdocs() {
    
    if (!document.getElementById("doclink")) {
        document.getElementById("docs").innerHTML = "See documentation below:";
        var a = document.createElement('a');
        var linkText = document.createTextNode("ASR 1000 Series Route Processor Data Sheet");
        a.appendChild(linkText);
        a.setAttribute('class', 'text-size-24 half-margin');
        a.id = "doclink";
        a.title = "RP3 Documentation";
        a.href = "https://www.cisco.com/c/en/us/products/collateral/routers/asr-1000-series-aggregation-services-routers/data_sheet_c78-441072.html";
        a.target = "_blank";
        document.body.appendChild(a);
        var parent = document.getElementById("docspace");
        parent.insertBefore(a, parent.lastChild)
    }
    return false;
}

function fixedline() {
    
    if (!document.getElementById("doclink")) {
        document.getElementById("docs").innerHTML = "See documentation below:";
        var a = document.createElement('a');
        var linkText = document.createTextNode("Cisco ASR 1000 Series Ethernet Line Cards Data Sheet");
        a.appendChild(linkText);
        a.setAttribute('class', 'text-size-24 half-margin');
        a.id = "doclink";
        a.title = "Line Card Documentation";
        a.href = "https://www.cisco.com/c/en/us/products/collateral/application-networking-services/wide-area-application-services-waas-software/data-sheet-c78-729778.html";
        a.target = "_blank";
        document.body.appendChild(a);
        var parent = document.getElementById("docspace");
        parent.insertBefore(a, parent.lastChild)
    }
    return false;
}

function espdocs() {
    
    if (!document.getElementById("doclink")) {
        document.getElementById("docs").innerHTML = "See documentation below:";
        var a = document.createElement('a');
        var linkText = document.createTextNode("ASR 1000 Series Embedded Services Processors Data Sheet");
        a.appendChild(linkText);
        a.setAttribute('class', 'text-size-24 half-margin');
        a.id = "doclink";
        a.title = "ESP Documentation";
        a.href = "https://www.cisco.com/c/en/us/products/collateral/routers/asr-1000-series-aggregation-services-routers/datasheet-c78-731640.html";
        a.target = "_blank";
        document.body.appendChild(a);
        var parent = document.getElementById("docspace");
        parent.insertBefore(a, parent.lastChild)
    }
    return false;
}

function asrdocs() {
    
    if (!document.getElementById("doclink")) {
        document.getElementById("docs").innerHTML = "See documentation below:";
        var a = document.createElement('a');
        var linkText = document.createTextNode("Cisco ASR 1000 Series Aggregation Services Routers Data Sheet");
        a.appendChild(linkText);
        a.setAttribute('class', 'text-size-24 half-margin');
        a.id = "doclink";
        a.title = "ASR Documentation";
        a.href = "https://www.cisco.com/c/en/us/products/collateral/routers/asr-1000-series-aggregation-services-routers/datasheet-c78-731632.html";
        a.target = "_blank";
        document.body.appendChild(a);
        var parent = document.getElementById("docspace");
        parent.insertBefore(a, parent.lastChild)
    }
    return false;
}

function clearfail() {
    document.getElementById("success").innerHTML = "";
    document.getElementById("table").innerHTML = "";
    document.getElementById("tablecap").innerHTML = "";
    document.getElementById("table").hidden = true;
}

function clearsuccess() {
    document.getElementById("message").innerHTML = "";
    document.getElementById("docs").innerHTML = "";
    document.getElementById("doclink").remove();
}
