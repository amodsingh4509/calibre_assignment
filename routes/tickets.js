import express from 'express';
import { verifyAdmin, verifytoken } from '../utils/verifyauth.js';
import Tickets from '../models/Tickets.js';
import Users from '../models/Users.js';
import morgan from 'morgan'

const routes = express.Router();
routes.get('/all', async (req, res, next) => {
    try {
        const alltickets = await Tickets.find();
        res.status(200).json(alltickets);
    } catch (error) {
        next(error)
    }
});
routes.post('/new', verifyAdmin, async (req, res, next) => {


    try {
        var random = Math.floor(Math.random() * 10)
        console.log(random);
        const assigned = await Users.findOne().skip(random)
        // res.status(200).json(assigned)
        console.log(assigned)
        try {
            const tickets = await Tickets.create(req.body);
            await Tickets.findByIdAndUpdate(tickets._id,{assignedTo:assigned.username})

            res.status(201).json({ id: tickets._id })

        } catch (error) {
            res.status(500).json(error)
        }

    } catch (error) {
        next(error)
    }




});

routes.get('/:id', async (req, res, next) => {

    try {
        const ticket = await Tickets.findById(req.params.id);
        res.status(200).json(ticket);
    } catch (error) {
        next(error)
    }

});

routes.post('/markAsClosed/:id', verifyAdmin || verifytoken, async (req, res,next) => {
    const ticketid = req.params.id;
    try {
        const ticket = await Tickets.findOne({_id: ticketid});
        if(ticket.priority === 'high')
        {
            try {
                await Tickets.findByIdAndUpdate(req.params.id, { status: "closed" });
                res.status(200).send("Status Closed")
            } catch (error) {
                next(error);
            }
        }
        const highprioritytickets = await Tickets.find({username:ticket.username,priority:"high"|| "medium"});
        if (!highprioritytickets) {
            try {
                await Tickets.findByIdAndUpdate(req.params.id, { status: "closed" });
                res.status(200).send("Status Closed")
            } catch (error) {
                next(error);
            }
        }
        else{
            res.status(400).json({error:'A higher priority task remains to be closed',tickets:highprioritytickets});
        }
    } catch (error) {
        next(error)
        
    }
    
})
routes.post('/delete/:id', verifyAdmin, async (req, res) => {
    try {
        await Tickets.findByIdAndDelete(req.params.id);
        res.status(200).send("Ticket Deleted")
    } catch (error) {
        next(error);
    }
})

routes.get('/', async (req, res, next) => {
    if (req.query.status) {
        try {
            const tickets = await Tickets.find({ status: req.query.status });
            res.status(200).json(tickets);
        } catch (error) {
            next(error)
        }
    }
    if (req.query.priority) {
        try {
            const tickets = await Tickets.find({ priority: req.query.priority });
            res.status(200).json(tickets);
        } catch (error) {
            next(error)
        }
    }
    if (req.query.title) {
        try {
            const tickets = await Tickets.find({ title: req.query.title });
            res.status(200).json(tickets);
        } catch (error) {
            next(error)
        }

    }

});

export default routes;