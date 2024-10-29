<template>
  <div class="doctor-view">
    <h2>Scheduled Appointments</h2>
    <div v-if="appointments.length > 0" class="appointments-container">
      <div class="appointment-card" v-for="(appointment, index) in appointments" :key="index">
        <p><strong>Appointment {{ index + 1 }}</strong></p>
        <p><strong>Patient Name:</strong> {{ appointment.patientName }}</p>
        <p><strong>Details:</strong> {{ appointment.details }}</p>
        <p><strong>Appointment Date and Time:</strong> {{ appointment.appointmentDate }}</p>
        <p><strong>Doctor:</strong> {{ appointment.doctor }}</p>
        <p><strong>Clinic/Hospital:</strong> {{ appointment.clinic }}</p>
      </div>
    </div>
    <div v-else class="no-appointments">
      <p>No appointments registered.</p>
    </div>

    <!-- Botón para limpiar citas -->
    <button v-if="appointments.length > 0" class="clear-button" @click="clearAppointments">Clear</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      appointments: []
    };
  },
  created() {
    this.loadAppointments();
    window.addEventListener('storage', this.loadAppointments);
  },
  methods: {
    loadAppointments() {
      // Cargar solo las citas programadas
      this.appointments = JSON.parse(localStorage.getItem('scheduledAppointments')) || [];
    },
    clearAppointments() {
      // Eliminar solo las citas programadas del localStorage y actualizar la vista
      localStorage.removeItem('scheduledAppointments');
      this.appointments = [];
    }
  },
  beforeDestroy() {
    window.removeEventListener('storage', this.loadAppointments);
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
.clear-button {
  background-color: #4caf50; /* Verde */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s;
}
.clear-button:hover {
  background-color: #388e3c; /* Verde más oscuro al pasar el mouse */
}
</style>
