# Home Automation on a Rapberry Pi | Mobile App

This project is the mobile application extension of the home automation system developed as part of mt diploma thesis, "A home automation system based on Raspberry Pi". It provides a cross-platform mobile interface for monitoring and controlling smart home devices, complementing the web-based dashboard from the main platform.

Link to the main project: https://github.com/panastasiadis/raspi-home-automation-platform

## Overview

The mobile app is built using **Apache Cordova**. It connects to the same backend server as the web client, providing real-time monitoring and control capabilities for your smart home environment.

## Key Features

### 🔐 **Authentication & Security**
- Secure login system with JWT token authenticatiΦon


### 📊 **Real-Time Monitoring**
- Live sensor data display via MQTT connections
- Real-time updates for temperature, humidity, light intensity, and motion detection
- Connection alerts

### 🎛️ **Device Control**
- Direct control of smart devices (lights, heaters, etc.)
- Intuitive touch-based interface for device management
- Real-time feedback on device state changes

### ⏰ **Advanced Automation**
- **Timer Actions**: Schedule device operations at specific times
- **Sensor-Based Actions**: Trigger devices based on sensor readings
- **Location-Based Actions**: Automate devices based on user location
- Action management with create, edit, and delete capabilities

### 📍 **Location Services**
- Background location tracking for location-based automation
- Geofencing capabilities for proximity-based triggers

### 🔔 **Notifications & Alerts**
- Real-time alerts for device connections/disconnections
- Action execution notifications
- User-friendly alert messages with color coding

## Configuration

### Backend Connection
The app connects to the main home automation backend server. Ensure your backend is running and accessible before using the mobile app.

### Location Services
For location-based actions, the app requires:
- Location permissions on the device
- Background location access for geofencing
- Internet connection for location services

## Usage

### Authentication
1. Launch the app
2. Enter your credentials (same as web dashboard)
3. The app will verify your session and connect to your smart home

### Monitoring Sensors
- View real-time sensor data on the dashboard


### Managing Actions
- Create timer-based actions for scheduled automation
- Set up sensor-based triggers for conditional automation
- Configure location-based actions for proximity automation
- Edit or delete existing actions as needed

For the complete system documentation, refer to the main home automation platform repository.
