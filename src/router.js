import { createRouter, createWebHistory } from 'vue-router';
import Hospitals from './components/Hospitals/Hospitals.component.vue';
import RecommendedProducts from './components/Products/RecommendedProducts.component.vue';
import MainImage from './layouts/MainLayout.component.vue';
import DoctorView from "@/components/Doctors/DoctorView.vue";
import DoctorViewHistory from "@/components/Doctors/DoctorView.History.vue";
import LoginDoctorComponent from "@/components/LoginDoctor/Login.Doctor.component.vue";
import LoginUsuarioComponent from "@/components/LoginUsuario/Login.Usuario.component.vue";
import RegisterUsuarioComponent from "@/components/RegisterUsuario/Register.Usuario.component.vue";
import RegisterDoctorComponent from "@/components/RegisterDoctor/Register.Doctor.component.vue";
import DoctorsComponent from "@/components/Doctors/Doctors.component.vue";


const routes = [

    { path: '/', component: LoginDoctorComponent },
    { path: '/login-usuario', component: LoginUsuarioComponent },
    { path: '/register-usuario', component: RegisterUsuarioComponent },
    { path: '/register-doctor', component: RegisterDoctorComponent },

    {
        path: '/main',
        component: MainImage,
        children: [
            { path: 'doctor', component: DoctorsComponent },
            { path: 'hospitals', component: Hospitals },
            { path: 'products', component: RecommendedProducts },
            { path: 'doctor-view', component: DoctorView },
            { path: 'doctor-view/history', component: DoctorViewHistory},
        ],


    },

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
