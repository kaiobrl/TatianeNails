import { addAppointment } from '../scripts/appointments.js';

class BookingForm extends HTMLElement {
    constructor() {
        super();
        this.services = [
            { id: 'manicure', name: 'Manicure Tradicional', price: 'R$ 35,00', duration: 30 },
            { id: 'pedicure', name: 'Pedicure', price: 'R$ 40,00', duration: 45 },
            { id: 'spa', name: 'SPA das Mãos', price: 'R$ 65,00', duration: 60 },
            { id: 'gel', name: 'Unhas em Gel', price: 'R$ 120,00', duration: 90 },
            { id: 'decoracao', name: 'Decoração Artística', price: 'R$ 25,00', duration: 30 }
        ];
        
        this.professionals = [
            { id: 'karina', name: 'Karina Costa', specialty: 'Unhas em Gel' },
            { id: 'tamires', name: 'Tamires Santos', specialty: 'Nail Art' },
            { id: 'tatiane', name: 'Tatiane Oliveira', specialty: 'Manicure Tradicional' }
        ];

        this.SALON_WHATSAPP = "5583981374944";
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.innerHTML = `
            <form id="appointmentForm" class="space-y-6">
                <div>
                    <label class="block text-gray-700 text-sm font-semibold mb-2">Selecione o Serviço</label>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        ${this.services.map(service => `
                            <label class="relative flex items-start p-4 cursor-pointer bg-white rounded-lg border border-gray-200 hover:border-rose-500 transition-colors">
                                <input type="radio" name="service" value="${service.id}" class="sr-only peer" required>
                                <div class="flex-1">
                                    <span class="block text-sm font-medium text-gray-900">${service.name}</span>
                                    <span class="block text-sm text-gray-500">${service.price}</span>
                                </div>
                                <div class="peer-checked:bg-rose-500/10 peer-checked:border-rose-500 absolute inset-0 border-2 border-transparent rounded-lg pointer-events-none"></div>
                            </label>
                        `).join('')}
                    </div>
                </div>

                <div>
                    <label class="block text-gray-700 text-sm font-semibold mb-2">Escolha a Profissional</label>
                    <select name="professional" required class="w-full p-3 rounded-lg border-gray-300 focus:border-rose-500 focus:ring-rose-500">
                        <option value="">Selecione uma profissional</option>
                        ${this.professionals.map(pro => `
                            <option value="${pro.id}">${pro.name} - ${pro.specialty}</option>
                        `).join('')}
                    </select>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-gray-700 text-sm font-semibold mb-2">Data</label>
                        <input type="date" name="date" required class="w-full p-3 rounded-lg border-gray-300 focus:border-rose-500 focus:ring-rose-500">
                    </div>
                    <div>
                        <label class="block text-gray-700 text-sm font-semibold mb-2">Horário</label>
                        <select name="time" required class="w-full p-3 rounded-lg border-gray-300 focus:border-rose-500 focus:ring-rose-500">
                            <option value="">Selecione um horário</option>
                            <option value="09:00">09:00</option>
                            <option value="10:00">10:00</option>
                            <option value="11:00">11:00</option>
                            <option value="14:00">14:00</option>
                            <option value="15:00">15:00</option>
                            <option value="16:00">16:00</option>
                            <option value="17:00">17:00</option>
                        </select>
                    </div>
                </div>

                <div class="space-y-4">
                    <div>
                        <label class="block text-gray-700 text-sm font-semibold mb-2">Nome Completo</label>
                        <input type="text" name="name" required class="w-full p-3 rounded-lg border-gray-300 focus:border-rose-500 focus:ring-rose-500">
                    </div>
                    <div>
                        <label class="block text-gray-700 text-sm font-semibold mb-2">WhatsApp</label>
                        <input type="tel" name="phone" required placeholder="(00) 00000-0000" class="w-full p-3 rounded-lg border-gray-300 focus:border-rose-500 focus:ring-rose-500">
                    </div>
                </div>

                <button type="submit" class="w-full bg-rose-600 text-white py-3 px-6 rounded-lg hover:bg-rose-700 transition-colors font-medium flex items-center justify-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-.66 1.162-.66 2.829 1.212 3.285 1.38 3.508c.172.223 2.41 3.679 5.832 5.159.815.354 1.452.566 1.947.721.819.263 1.566.226 2.156.137.658-.098 2.026-.829 2.31-1.63.283-.799.283-1.485.208-1.631z"/>
                    </svg>
                    <span>Agendar via WhatsApp</span>
                </button>
            </form>
        `;
    }

    maskPhone(phoneInput) {
        let value = phoneInput.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
            if (value.length >= 10) {
                value = value.replace(/(\d)(\d{4})$/, '$1-$2');
            }
        }
        phoneInput.value = value.slice(0, 15);
    }

    validateDate(dateInput) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selectedDate = new Date(dateInput.value);
        selectedDate.setHours(0, 0, 0, 0);
        
        if (!dateInput.value) {
            return true;
        }
        
        if (selectedDate < today) {
            dateInput.value = '';
            alert('Por favor, selecione uma data futura.');
            return false;
        }
        return true;
    }

    setupEventListeners() {
        const form = this.querySelector('#appointmentForm');
        const phoneInput = this.querySelector('input[name="phone"]');
        const dateInput = this.querySelector('input[name="date"]');
        
        phoneInput.addEventListener('input', () => this.maskPhone(phoneInput));
        dateInput.addEventListener('change', () => this.validateDate(dateInput));
        
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (!form.checkValidity()) {
                alert('Por favor, preencha todos os campos corretamente.');
                return;
            }
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            const service = this.services.find(s => s.id === data.service);
            const professional = this.professionals.find(p => p.id === data.professional);
            
            if (!service || !professional) {
                alert('Por favor, selecione o serviço e a profissional.');
                return;
            }
            
            if (!this.validateDate(dateInput)) {
                return;
            }
            
            const date = new Date(data.date);
            const formattedDate = date.toLocaleDateString('pt-BR');
            
            const message = `Olá! Gostaria de agendar um horário:\n\n` +
                        `*Serviço:* ${service.name}\n` +
                        `*Profissional:* ${professional.name}\n` +
                        `*Data:* ${formattedDate}\n` +
                        `*Horário:* ${data.time}\n\n` +
                        `*Cliente:* ${data.name}\n` +
                        `*Contato:* ${data.phone}`;

            // Save appointment locally (admin panel reads from localStorage)
            try {
                const appointment = {
                    id: Date.now(),
                    service: service.name,
                    professional: professional.name,
                    date: data.date,
                    time: data.time,
                    name: data.name,
                    phone: data.phone
                };
                addAppointment(appointment);
            } catch (err) {
                // If saving fails, continue to WhatsApp flow
                console.warn('Erro ao salvar agendamento localmente:', err);
            }

            const whatsappUrl = `https://wa.me/${this.SALON_WHATSAPP}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });
    }
}

customElements.define('booking-form', BookingForm);
