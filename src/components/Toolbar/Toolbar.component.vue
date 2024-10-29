<template>
  <div>
    <nav class="toolbar">
      <div v-if="isDoctorView">
        <router-link to="/main/doctor-view" class="toolbar-link" @mouseover="highlight" @mouseout="unhighlight">Scheduled Appointments</router-link>
        <router-link to="/main/doctor-view/history" class="toolbar-link" @mouseover="highlight" @mouseout="unhighlight">Appointment History</router-link>
      </div>
      <div v-else>
        <router-link to="/main/doctor" class="toolbar-link" @mouseover="highlight" @mouseout="unhighlight">Doctors</router-link>
        <a href="#" class="toolbar-link" @click.prevent="showModal = true" @mouseover="highlight" @mouseout="unhighlight">Appointment</a>
        <router-link to="/main/hospitals" class="toolbar-link" @mouseover="highlight" @mouseout="unhighlight">Hospitals/Clinics</router-link>
        <router-link to="/main/products" class="toolbar-link" @mouseover="highlight" @mouseout="unhighlight">Recommended products</router-link>
      </div>
    </nav>

    <!-- Modal de PrimeVue para las citas -->
    <Dialog header="Appointment Booking" v-model:visible="showModal" :modal="true" :closable="true" :draggable="false" :resizable="false" :dismissableMask="true" width="300px">
      <div class="modal-content">
        <Button label="Appointment Booking" class="p-button-outlined p-button-success" @click="openDoctorsClinicsModal" style="width: 100%; margin-bottom: 10px;" />
        <Button label="View appointment history" class="p-button-outlined p-button-info" @click="viewAppointmentHistory" style="width: 100%;" />
      </div>
    </Dialog>

    <!-- Segundo modal para mostrar doctores y clínicas con estilos e imágenes -->
    <Dialog header="Select Doctor and Clinic" v-model:visible="showDoctorsClinicsModal" :modal="true" :closable="true" :draggable="false" :resizable="false" :dismissableMask="true" width="800px">
      <div class="modal-content">
        <h3>Doctors available</h3>
        <div class="doctors-container">
          <div class="doctor"
               v-for="doctor in doctors"
               :key="doctor.id"
               :class="{'selected': selectedDoctor && selectedDoctor.id === doctor.id}"
               @click="selectDoctor(doctor)">
            <img :src="getImagePath(doctor.image)" alt="Doctor Image" class="doctor-image" />
            <h3 class="doctor-name">{{ doctor.name }}</h3>
            <p class="doctor-description">{{ doctor.description }}</p>
            <div class="rating">
              <i v-for="star in 5" :key="star" class="pi" :class="star <= doctor.rating ? 'pi-star-fill' : 'pi-star'"></i>
            </div>
          </div>
        </div>

        <h3>Clinics/Hospitals available</h3>
        <div class="hospitals-container">
          <div class="hospital"
               v-for="clinic in clinics"
               :key="clinic.id"
               :class="{'selected': selectedClinic && selectedClinic.id === clinic.id}"
               @click="selectClinic(clinic)">
            <img :src="getImagePath(clinic.image)" alt="Hospital Image" class="hospital-image" />
            <h3 class="hospital-name">{{ clinic.name }}</h3>
            <p class="hospital-description">{{ clinic.description }}</p>
            <p class="hospital-location">{{ clinic.location }}</p>
            <div class="rating">
              <i v-for="star in 5" :key="star" class="pi" :class="star <= clinic.rating ? 'pi-star-fill' : 'pi-star'"></i>
            </div>
          </div>
        </div>

        <!-- Botón para guardar la cita -->
        <Button
            label="Save appointment"
            class="p-button-success"
            :disabled="!selectedDoctor || !selectedClinic"
            @click="saveAppointment"
            style="margin-top: 20px;" />
      </div>
    </Dialog>

    <!-- Modal para ingresar datos del usuario -->
    <Dialog header="Fill in your details" v-model:visible="showUserDetailsModal" :modal="true" :closable="true" :draggable="false" :resizable="false" width="400px">
      <div class="modal-content">
        <h3>Ingrese sus datos</h3>
        <div class="input-group">
          <label for="name">Name:</label>
          <input v-model="userName" type="text" id="name" placeholder="Enter your name" />
        </div>
        <div class="input-group">
          <label for="age">Age:</label>
          <input v-model.number="userAge" type="number" id="age" placeholder="Enter your age" min="0" />
        </div>
        <div class="input-group">
          <label for="symptoms">Description of the discomfort:</label>
          <textarea v-model="userSymptoms" id="symptoms" placeholder="Describe your discomfort"></textarea>
        </div>
        <div class="input-group">
          <label for="appointmentDate">Appointment date:</label>
          <input v-model="appointmentDate" type="date" id="appointmentDate" />
        </div>
        <div class="input-group">
          <label for="appointmentTime">Appointment time:</label>
          <input v-model="appointmentTime" type="time" id="appointmentTime" />
        </div>
        <Button label="Confirm appointment" class="p-button-success" @click="confirmAppointment" style="margin-top: 20px;" />
      </div>
    </Dialog>


    <!-- Modal de confirmación de cita reservada con éxito -->
    <Dialog header="Reserved Appointment" v-model:visible="showSuccessModal" :modal="true" :closable="true" :draggable="false" :resizable="false" width="300px">
      <div class="modal-content">
        <p>Successfully booked appointment.</p>
        <Button label="Close" class="p-button-outlined" @click="showSuccessModal = false" style="width: 100%; margin-top: 10px;" />
      </div>
    </Dialog>

    <!-- Modal para mostrar el historial de citas -->
    <Dialog header="dating history" v-model:visible="showHistoryModal" :modal="true" :closable="true" :draggable="false" :resizable="false" width="600px">
      <div class="modal-content">
        <div v-if="appointment.length > 0">
          <div v-for="(appointment, index) in appointment" :key="index" class="appointment-record">
            <p><strong>Registration date and time:</strong> {{ appointment.registrationDate }}</p>
            <p><strong>Date of doctor's appointment:</strong> {{ appointment.appointmentDate }}</p>
            <p><strong>Doctor:</strong> {{ appointment.doctor }}</p>
            <p><strong>Clinic/Hospital:</strong> {{ appointment.clinic }}</p>
            <hr />
          </div>
        </div>
        <div v-else>
          <p>There are no registered appointments.</p>
        </div>
        <Button label="Close" class="p-button-outlined" @click="showHistoryModal = false" style="width: 100%; margin-top: 10px;" />
      </div>
    </Dialog>
  </div>
</template>

<script>
// Importa tus componentes y datos
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import enDoctors from '../../locales/en.doctors.json';
import enHospitals from '../../locales/en.hospitals.json';

export default {
  components: {
    Dialog,
    Button
  },
  data() {
    return {
      showModal: false,
      showDoctorsClinicsModal: false,
      showUserDetailsModal: false,
      showSuccessModal: false,
      showHistoryModal: false, // Estado para controlar el modal de historial de citas
      doctors: [],
      clinics: [],
      selectedDoctor: null,
      selectedClinic: null,
      userName: "",
      userAge: null,
      userSymptoms: "",
      appointmentDate: "", // Fecha de la cita
      appointmentTime: "", // Hora de la cita
      appointment: [],
    };
  },
  created() {
    this.loadDoctorsAndClinics();
  },
  computed: {
    isDoctorView() {
      // Detectar si la ruta actual es /doctor-view o /doctor-view/history
      return this.$route.path === '/main/doctor-view' || this.$route.path === '/main/doctor-view/history';
    }
  },
  methods: {
    highlight(event) {
      event.target.style.color = 'blue';
    },
    unhighlight(event) {
      event.target.style.color = 'white';
    },
    openDoctorsClinicsModal() {
      this.showModal = false;
      this.showDoctorsClinicsModal = true;
    },
    viewAppointmentHistory() {
      this.appointment = JSON.parse(localStorage.getItem('scheduledAppointments')) || [];
      this.showHistoryModal = true; // Mostrar el modal de historial de citas
    },
    loadDoctorsAndClinics() {
      const currentLocale = this.$i18n.locale;
      this.doctors = currentLocale === 'es' ? require('../../locales/es.doctors.json') : enDoctors;
      this.clinics = currentLocale === 'es' ? require('../../locales/es.hospitals.json') : enHospitals;
    },
    getImagePath(imageName) {
      return new URL(`../../assets/${imageName}`, import.meta.url).href;
    },
    selectDoctor(doctor) {
      this.selectedDoctor = doctor;
    },
    selectClinic(clinic) {
      this.selectedClinic = clinic;
    },
    saveAppointment() {
      this.showDoctorsClinicsModal = false;
      this.showUserDetailsModal = true;
    },
    // IMPORTANTE RUTA DE LOS DOCTORES
    confirmAppointment() {
      if (this.userName && this.userAge && this.userSymptoms && this.appointmentDate && this.appointmentTime) {
        const appointment = {
          registrationDate: new Date().toLocaleString(),
          appointmentDate: `${this.appointmentDate} a las ${this.appointmentTime}`,
          doctor: this.selectedDoctor.name,
          clinic: this.selectedClinic.name,
          patientName: this.userName,
          details: this.userSymptoms
        };

        // Guardar en el localStorage para citas programadas
        let scheduledAppointments = JSON.parse(localStorage.getItem('scheduledAppointments')) || [];
        scheduledAppointments.push(appointment);
        localStorage.setItem('scheduledAppointments', JSON.stringify(scheduledAppointments));

        // Guardar en el localStorage para el historial de citas
        let appointmentHistory = JSON.parse(localStorage.getItem('appointmentHistory')) || [];
        appointmentHistory.push(appointment);
        localStorage.setItem('appointmentHistory', JSON.stringify(appointmentHistory));

        this.showUserDetailsModal = false;
        this.showSuccessModal = true;

        // Limpiar campos después de confirmar
        this.userName = "";
        this.userAge = null;
        this.userSymptoms = "";
        this.appointmentDate = "";
        this.appointmentTime = "";
        this.selectedDoctor = null;
        this.selectedClinic = null;
      } else {
        alert("Please complete all fields.");
      }
    },

    adjustAppointmentYear() {
      if (this.appointmentDate) {
        const [year, month, day] = this.appointmentDate.split('-');
        if (year !== '2024') {
          this.appointmentDate = `2024-${month}-${day}`;
        }
      }
    }
  },
  watch: {
    '$i18n.locale'(newLocale) {
      this.loadDoctorsAndClinics();
    },
    appointmentDate(newDate) {
      this.adjustAppointmentYear();
    }
  }
}
</script>


<style scoped>
/* Estilo para el fondo del modal */
.p-dialog {
  background-color: white !important;
  border-radius: 15px;
  border: 3px solid #6EDC8A; /* Borde verde */
  max-width: 850px;
  width: 100%;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 128, 0, 0.2); /* Sombra con tono verde */
}

/* Estilo para el contenido del modal */
.modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background-color: white;
  border-radius: 15px;
  max-height: 600px;
  overflow-y: auto;
  border: 2px solid #6EDC8A; /* Borde verde */
  color: black;
}

.p-button-success {
  border-radius: 20px;
  padding: 10px 0;
  width: 60%;
  background-color: #6EDC8A !important; /* Fondo verde */
  color: #171616 !important;
  margin-top: 20px;
  transition: background-color 0.3s ease;
}

.p-button-success:hover {
  background-color: #58c778 !important; /* Cambia a un verde más oscuro al pasar el mouse */
}

/* Contenedor para los doctores y las clínicas */
.doctors-container, .hospitals-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Centra los elementos horizontalmente */
  gap: 20px; /* Espacio entre los elementos */
  padding: 10px;
  background-color: white;
  border-radius: 10px;
  max-width: 100%;
  overflow-y: auto;
  color: black;
}

/* Ajustes para las tarjetas de doctores y clínicas */
.doctor, .hospital {
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 128, 0, 0.2); /* Sombra con tono verde */
  overflow: hidden;
  text-align: center;
  width: 200px; /* Ajusta el ancho */
  padding: 15px;
  margin: 10px; /* Añade margen para separación */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  border: 2px solid #6EDC8A; /* Borde verde */
}

.doctor:hover, .hospital:hover {
  transform: scale(1.05);
  border-color: #58c778; /* Cambia a un verde más oscuro al pasar el mouse */
  box-shadow: 0 6px 12px rgba(0, 128, 0, 0.3); /* Sombra verde más pronunciada */
}

/* Ajustes para las imágenes */
.doctor-image, .hospital-image {
  width: 100%;
  height: 150px; /* Ajusta la altura según tus necesidades */
  border-radius: 10px;
  object-fit: cover; /* Mantén la proporción de la imagen */
  margin-bottom: 10px;
}

.doctor.selected, .hospital.selected {
  border: 3px solid #6EDC8A; /* Borde verde más grueso */
  background-color: #A1FFF2; /* Fondo verde claro */
}

.rating {
  margin-top: 5px;
}

.doctor-name, .hospital-name {
  font-size: 1.1em;
  color: #333;
  margin: 0;
  font-weight: bold;
}

.doctor-description, .hospital-description, .hospital-location {
  font-size: 0.9em;
  color: #666;
  margin: 5px 0;
}

.appointment-record {
  padding: 10px;
  border: 1px solid #6EDC8A; /* Borde verde */
  border-radius: 5px;
  background-color: #EAF9F0; /* Fondo verde claro */
  margin-bottom: 10px;
}
.toolbar {
  display: flex;
  background-color: black;
  padding: 10px;
}
.toolbar-link {
  color: white;
  margin-right: 200px;
  text-decoration: none;
}
.toolbar-link:hover {
  color: lightblue;
}
</style>

