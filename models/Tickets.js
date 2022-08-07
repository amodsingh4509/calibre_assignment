import mongoose from 'mongoose';

const TicketSchema = mongoose.Schema({


    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "open"
    },
    priority: {
        type: String,
        default: "low",
    },
    assignedTo: {
        type: String,
    }

},
    { timestamp: true }  
)


export default mongoose.model('Ticket', TicketSchema);