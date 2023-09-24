const search = async () => {
    let inputText = document.getElementById('factoryNumberInput');
    console.log(inputText.value);
    await fetch(`api/v1/machine/${inputText.value}/?format=json`).then((response) => {return response.json()})
    .then(async data => {
        // const table = document.getElementById('dataTable');
        const tr = document.getElementById('machineInfo');
        tr.innerHTML = '';
        const cell_MOM = tr.insertCell(-1);
        const cell_FNOM = tr.insertCell(-1);
        const cell_MOE = tr.insertCell(-1);
        const cell_FNOE = tr.insertCell(-1);
        const cell_MOT = tr.insertCell(-1);
        const cell_FNOT = tr.insertCell(-1);
        const cell_MOMA = tr.insertCell(-1);
        const cell_FNOMA = tr.insertCell(-1);
        const cell_MOSA = tr.insertCell(-1);
        const cell_FNOSA = tr.insertCell(-1);
        cell_MOM.innerHTML = data.modelOfMachine.title;
        cell_FNOM.innerHTML = data.factoryNumberOfMachine;
        cell_MOE.innerHTML = data.modelOfEngine.title;
        cell_FNOE.innerHTML = data.factoryNumberOfEngine;
        cell_MOT.innerHTML = data.modelOfTransmission.title;
        cell_FNOT.innerHTML = data.factoryNumberOfTransmission;
        cell_MOMA.innerHTML = data.modelOfMainAxle.title;
        cell_FNOMA.innerHTML = data.factoryNumberOfMainAxle;
        cell_MOSA.innerHTML = data.modelOfSteeringAxle.title;
        cell_FNOSA.innerHTML = data.factoryNumberOfSteeringAxle;
        
    })
}

document.getElementById('factoryNumberButton').addEventListener('click', search)

