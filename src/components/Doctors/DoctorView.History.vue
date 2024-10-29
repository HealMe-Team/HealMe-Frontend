<template>
  <div class="doctor-history-view">
    <h2>Appointment History</h2>
    <div v-if="appointmentHistory.length > 0" class="appointments-container">
      <div class="appointment-card" v-for="(appointment, index) in appointmentHistory" :key="index">
        <p><strong>Appointment {{ index + 1 }}</strong></p>
        <p><strong>Patient Name:</strong> {{ appointment.patientName }}</p>
        <p><strong>Details:</strong> {{ appointment.details }}</p>
        <p><strong>Appointment Date and Time:</strong> {{ appointment.appointmentDate }}</p>
        <p><strong>Doctor:</strong> {{ appointment.doctor }}</p>
        <p><strong>Clinic/Hospital:</strong> {{ appointment.clinic }}</p>
      </div>
    </div>
    <div v-else class="no-appointments">
      <p>No appointments in the history.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      appointmentHistory: []
    };
  },
  created() {
    this.loadAppointmentHistory();
    window.addEventListener('storage', this.loadAppointmentHistory);
  },
  methods: {
    loadAppointmentHistory() {
      // Cargar el historial de citas
      this.appointmentHistory = JSON.parse(localStorage.getItem('appointmentHistory')) || [];
    }
  },
  beforeDestroy() {
    window.removeEventListener('storage', this.loadAppointmentHistory);
  }
};
</script>


<style scoped>
.doctor-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;

}
.appointments-container {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  color: #171616;
}
.appointment-card {
  background-color: #d0f5d0; /* Verde clarito */
  border: 2px solid #4caf50; /* Verde más fuerte */
  padding: 15px;
  margin: 10px;
  border-radius: 10px;
  width: 250px;
  text-align: left;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

}
.appointment-card:hover {
  transform: scale(1.05);
}
.no-appointments {
  background-color: #fff3e0;
  border: 2px solid #ff6f00;
  padding: 15px;
  margin: 10px;
  border-radius: 10px;
  width: 300px;
  text-align: center;
  color: #171616;
}
</style>
