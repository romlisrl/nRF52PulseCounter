[![Buy Me a Coffee](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://buymeacoffee.com/romlis)
![ESP-IDF](https://img.shields.io/badge/ESP--IDF-v5.x-blue)
![Zigbee](https://img.shields.io/badge/Zigbee-IEEE802.15.4-green)

### ⚠️ Don't forget to create an [external converter](./zigbee2mqtt/) in Zigbee2MQTT first!  

## ⚡ Installation  

### ⚠️ Don't forget to create an [external converter](./zigbee2mqtt/) in Zigbee2MQTT first!  

```bash
- git clone https://github.com/romlisrl/nRF52PulseCounter
- cd nRF52PulseCounter
- esphome compile gas-counter.yaml
- adafruit-nrfutil dfu serial --package .\firmware.zip -p COM15 -b 115200 
```
or  
>- uf2conv.py firmware.hex -c -o firmware.uf2 (copy UF2 file to the board in DFU mode)  

---