[![Buy Me a Coffee](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://buymeacoffee.com/romlis)
![ESP-IDF](https://img.shields.io/badge/ESP--IDF-v5.x-blue)
![Zigbee](https://img.shields.io/badge/Zigbee-IEEE802.15.4-green)
# nRF52840 Pulses Counter with Zigbee2MQTT

**nRF52840-based pulse counter** that counts pulses from utility meters with magnetic impulse output and sends them to **Zigbee2MQTT**.  

---

## 🚀 Quick Start  

1. Copy the external converter to Zigbee2MQTT.  
   👉 See [External Converter](./zigbee2mqtt/)  
2. Restart Zigbee2MQTT completely (full restart required).  
3. Enable Zigbee pairing (**permit join**)  
4. Flash the firmware onto your nRF52840 Supermini board.  

---

## ⚠️ Power Notes  

- nRF52840 P0.04 pin works at **3.3V only**.  
- **Do NOT** connect P0.04 pin directly to 5V.  
- Use a voltage regulator or voltage divider if needed.  
- Can also be **powered from USB** (3.3V internally regulated).  

---

## ✨ Features
<img src="./images/zigbee2mqtt.png" width="400" alt="Zigbee2MQTT" />  

- Counts pulses from a meter using a reed sensor connected to a GPIO and GND pin. 
- Stores pulse count in **non-volatile memory (NVS)**.  
- Sends data to **Zigbee2MQTT**:  
  - On a configurable timer  
  - When accumulated pulses reach a threshold  
  - Triggers immediate transmission when **Boot button** is pressed  
- Supports **deep sleep** for low power.  
- LED for pulse indication.  

---

## 🔧 Hardware
<img src="./images/nRF52840-supermini.png" width="400" alt="nRF52840 Supermini" />  

- [nRF52840 Supermini board](https://www.aliexpress.com/item/1005008965369485.html)  
- Utility meter with pulse output (e.g., BK-G4MT, Honeywell BK-G6M or similar)  
- Reed sensor (10AT is better): **Normally Open (NO)** – tested with [GPS-01 Reed Switch 4×18](https://www.aliexpress.com/item/1005007756163643.html) (not quite sensetive)  
- [Battery power supply (16850)](https://www.aliexpress.com/item/1005009442666781.html) (supports USB-C power banks)  

---

## 📦 Software Requirements

- [**Zigbee2MQTT**](https://www.zigbee2mqtt.io/) with external converter configured  
- [EspHome](https://esphome.io/)  
- [MQTT broker](https://mosquitto.org/)  
- [Home Assistant](https://www.home-assistant.io/) server  

---

## 🔌 Wiring Example

| nRF52840 Pin | Connection           |
|--------------|-----------------------|
| P0.06        | Reed sensor signal    |
| GND          | Reed sensor GND       |
| P0.04        | +3.7V (or USB)        |
| GND          | -3.7V (or USB)        |
|              |                       |

<img src="./images/nRF52840-wiring.png" width="400" alt="nRF52840 Supermini wiring" />

---

## 🚀 How It Works

1. nRF52840 Supermini counts pulses from the source.  
2. Pulses are stored in **NVS flash** for save after powerloss.  
3. Counter value and battery voltage sent to **Zigbee2MQTT**.  .  

---

## ⚡ Installation  

### ⚠️ Don't forget to create an [external converter](./zigbee2mqtt/) in Zigbee2MQTT first!  

- git clone https://github.com/romlisrl/nRF52PulseCounter
- cd nRF52PulseCounter
- esphome compile gas-counter.yaml
- adafruit-nrfutil dfu serial --package .\firmware.zip -p COM15 -b 115200 
  - uf2conv.py firmware.hex -c -o firmware.uf2 (copy UF2 file to the board in DFU mode)

## 📝 Notes

- Make sure the Zigbee coordinator is running and **permit join is enabled**
- After modifying the external converter, **restart Zigbee2MQTT completely** (do not use *Settings → Tools → Restart Zigbee2MQTT*)
