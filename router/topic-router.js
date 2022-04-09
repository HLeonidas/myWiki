import express from 'express';
import AppError from '../errorHandling/AppError.js';
// import { db } from '../firestore/firestore.js';
import { getFirestore } from 'firebase/firestore';

const router = express.Router();
const selectionFields =
    '_id symbol label changeDate creationDate';

//todo: check state doesnt quite work yet
router.get('/', async (req, res, next) => {
    try {
        // let periods = await Period.find({ user_id: req.user_id }, selectionFields);
        const db = getFirestore();

        let topics = await db.collection('topics').get();
        res.status(200).send(topics);
    }
    catch (err) {
        next(err);
    }
});

// router.get('/:id', async (req, res, next) => {
//     let id = req.params.id;

//     try {
//         checkId(id);

//         let period = await select(id);

//         res.status(200).send(period);
//     } catch (err) {
//         next(err);
//     }
// });



router.post('/', async (req, res, next) => {
    let topic = {
        symbol: "as",
        label: "testTopic",
        changeDate: new Date(),
        creationDate: new Date()
    };

    const db = getFirestore();

    try {
        // checkProperties(period, true);

        await db.collection('topics').add(topic);


        // Period.create(period, (err, savedPeriod) => {
        //     if (err) {
        //         next(err, req, res);
        //     } else {
        //         let response = {
        //             "url": "http://chatservice.informatik.htl-vil:2604/api/v1/periods/" + savedPeriod._id
        //         }

        //         res.status(201).send(response);
        //     }
        // });
    }
    catch (err) {
        next(err, req, res);
    }
});

// router.patch('/:id', async (req, res, next) => {
//     let newPeriod = req.body;
//     let id = req.params.id;
//     let periodToPatch;

//     try {
//         if (Object.keys(newPeriod).length == 0) {
//             throw new AppError(400, `Empty Period.`);
//         }

//         checkId(id);

//         periodToPatch = await select(id);

//         if (Object.prototype.hasOwnProperty.call(newPeriod, "_id") && newPeriod._id != id) {
//             throw new AppError(400, `URL and sent Object not same ID.`);
//         }

//         newPeriod._id = id;

//         checkProperties(newPeriod);

//         await checkState(newPeriod, periodToPatch._id);

//         Period.update(newPeriod, function (err, result) {
//             if (err) {
//                 throw new AppError(400, err);
//             }
//             else {
//                 res.status(200).json(result);
//             }
//         });
//     } catch (err) {
//         next(err, req, res);
//     }
// });

// router.delete('/:id', async (req, res, next) => {
//     let id = req.params.id;

//     try {
//         checkId(id);

//         await select(id);

//         //await deleteModalDocuments(id)

//         Period.delete(id, (err) => {
//             if (err) {
//                 throw new AppError(400, err);
//             }
//             else {
//                 res.status(204).send("Deleted period " + id);
//             }
//         });
//     }
//     catch (err) {
//         next(err, req, res);
//     }
// });

// async function select(id) {
//     let period = await Period.findOne({ _id: id }, selectionFields);

//     if (period == null) throw new AppError(404, `Period with id: ${id} not found.`);

//     return period;
// }

// /*async function deleteModalDocuments(periodId)
// {
//     Course.delete({period_id: periodId}, (err) => 
//     {
//         if(err)
//         {
//             throw new AppError(400, err);
//         }
//         else
//         {
//             //delete Pupil course ids
//         }
//     })
// }*/

// function checkProperties(period, isPost = false) {
//     for (let key in period) {
//         if (!selectionFields.includes(key)) {
//             if (!(key == "_id" && isPost == true)) {
//                 throw new AppError(400, `Not allowed property "${key}" found.`);
//             }
//         }
//     }

//     if (period.till < period.from)
//         throw new AppError(400, "Till cannot be before From");
// }

// async function checkState(newPeriod, periodToPatchId = null) {
//     const searchState = 'active';

//     if (newPeriod.state == searchState) {
//         let foundPeriod = await Period.findOne({ user_id: newPeriod.user_id, state: searchState }, selectionFields)

//         if (foundPeriod) {
//             // if(!periodToPatch || !(foundPeriod._id != periodToPatchId))
//             //     throw new AppError(400, 'Only one period can be active at the same time.');
//             if (foundPeriod._id != periodToPatchId) {
//                 foundPeriod.state = 'inactive';
//                 await Period.update(foundPeriod, function (err) {
//                     if (err) {
//                         throw new AppError(400, 'Something went wrong.');
//                     }
//                 });
//             }
//         }
//     }
// }

export { router as topicRouter };