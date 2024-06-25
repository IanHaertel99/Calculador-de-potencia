import {
  volumetricFlow,
  power,
  pressure,
  density,
  massFlow,
} from "engineering-unit-converter";

const inputPower = document.getElementById("input-power");
const inputVolume = document.getElementById("input-volume");
const inputPressure = document.getElementById("input-pressure");
const inputEfficiency = document.getElementById("input-efficiency");
const inputMass = document.getElementById("input-mass");
const inputDensity = document.getElementById("input-density");
const buttonPower = document.getElementById("power-button");
const rateSelect = document.getElementById("rate-select");

let counter = 0;
let totalPower = 0;

const unitVolume = document.getElementById("unit-volume");
const unitPressure = document.getElementById("unit-pressure");
const unitPower = document.getElementById("unit-power");
const unitMass = document.getElementById("unit-mass");
const unitDensity = document.getElementById("unit-density");

function calculateVolumeFromMassAndDensity(massFlow, density) {
  return massFlow / density;
}

function suma() {
  let volumetricFlowConverted;

  const selectedRate = rateSelect.value;
  console.log("Selected Rate:", selectedRate);

  if (selectedRate === "1") {
    const volumetricFlowInput = +inputVolume.value;
    const volumetricFlowUnit = unitVolume.value;
    volumetricFlowConverted = volumetricFlow(volumetricFlowInput)
      .from(volumetricFlowUnit)
      .to("m3/s");
  } else if (selectedRate === "2") {
    const valorMassInput = +inputMass.value;
    const valorDensityInput = +inputDensity.value;
    console.log("Mass Input:", valorMassInput);
    console.log("Density Input:", valorDensityInput);

    const valorMassUnit = unitMass.value;
    const valorMassConverted = massFlow(valorMassInput)
      .from(valorMassUnit)
      .to("lb/day");

    const valorDensityUnit = unitDensity.value;
    const valorDensityConverted = density(valorDensityInput)
      .from(valorDensityUnit)
      .to("kg/m3");

    console.log("Mass Converted:", valorMassConverted);
    console.log("Density Converted:", valorDensityConverted);

    const volumetricFlow = calculateVolumeFromMassAndDensity(
      valorMassConverted,
      valorDensityConverted
    );
    volumetricFlowConverted = volumetricFlow;
    console.log("volumetric Flow", volumetricFlowConverted);
  }

  const valorPressureInput = +inputPressure.value;
  const valorEfficiencyInput = +inputEfficiency.value;
  const valorPowerUnit = unitPower.value;

  const valorPressureUnit = unitPressure.value;
  const valorPressureConverted = pressure(valorPressureInput)
    .from(valorPressureUnit)
    .to("Pa");

  if (valorEfficiencyInput <= 0) {
    inputEfficiency.style.borderColor = "red";
    return (inputPower.value = "EFFICIENCY IS 0");
  } else {
    inputEfficiency.style.borderColor = "";
  }

  const powerCalculated =
    (volumetricFlowConverted * valorPressureConverted) / valorEfficiencyInput;

  const valorPowerConverted = power(powerCalculated)
    .from("W")
    .to(valorPowerUnit);

  inputPower.value = valorPowerConverted;

  totalPower = +valorPowerConverted;

  const tableBody = document.getElementById("tbody");
  const newRow = document.createElement("tr");
  const powerCell = document.createElement("td");
  const countCell = document.createElement("td");
  counter = counter + 1;
  countCell.innerHTML = counter;
  powerCell.innerHTML = valorPowerConverted;

  newRow.appendChild(countCell);
  newRow.appendChild(powerCell);
  tableBody.appendChild(newRow);

  updatePercentages();
}
function updatePercentages() {
  const rows = counter;
  document.getElementById("powerPercentage").textContent = (
    totalPower / rows
  ).toFixed(2);
}

function handleRateChange() {
  const selectedValue = rateSelect.value;
  if (selectedValue === "1") {
    document.getElementById("volumeId").classList.remove("hidden");
    document.getElementById("massId").classList.add("hidden");
    document.getElementById("densityId").classList.add("hidden");
  } else if (selectedValue === "2") {
    document.getElementById("volumeId").classList.add("hidden");
    document.getElementById("massId").classList.remove("hidden");
    document.getElementById("densityId").classList.remove("hidden");
  }
}

buttonPower.addEventListener("click", suma);
rateSelect.addEventListener("change", handleRateChange);
