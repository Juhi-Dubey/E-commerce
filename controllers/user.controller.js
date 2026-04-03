// // const { userService } = require('');


// const getProfileController = async (req, res, next) =>{
//     try {
//         const result = await userService.getProfile(req.user.id);

//         res.status(200).json({ 
//             success: true, 
//             data: result 
//         });

//     } catch (error) {
//         next(error);
//     }
// };


// const updateUserController = async (req, res, next) =>{
//     try {
//         const result = await userService.updateUser(
//             req.user.id,
//             req.body
//         );

//         res.status(200).json({ 
//             success: true, 
//             data: result           
//         });

//     } catch (error) {
//         next(error);
//     }
// };


// const deleteUserController = async (req, res, next) => { 
//     try { 
//         const result = await userService.deleteUser(req.user.id); 
        
//         res.status(200).json({ 
//             success: true, 
//             message: result.message 

//         }); 
//     } catch (error) { 
//         next(error); 
//     } 
// };


// module.exports = { 
//     getProfileController, 
//     updateUserController, 
//     deleteUserController 
// };