const {Router} = require('express')
const Course = require('../models/course')
const router = Router()


router.get('/',async (req,res)=>{
    const courses = await Course.find()
    .populate('userId','email name')
    .select('price title img')
    console.log(courses);
    
    res.render('courses',{
        title:'курсы',
        isCourse:true,
        courses
    })
})

router.get('/:id/edit',async(req,res)=>{
    if (!req.query.allow) {
       return  res.redirect('/')
    }

    const course = await Course.findById(req.params.id)
    res.render('course-edit',{
        title:`Редактировать ${course.title}`,
        course
    })    
})

router.post('/remove',async (req,res)=>{
    try{
        await Course.deleteOne({
            _id :req.body.id
        })
        res.redirect('/courses')
    }
    catch(e){
        
    }
    
})

router.post('/edit',async(req,res)=>{
    const {id} = req.body
    delete req.body.id
    const course = await Course.findByIdAndUpdate(id,req.body)
    console.log(req.body);
    res.redirect('/courses')
    // res.render('course',{
    //     layout:'empty',
    //     title:`Курс ${course.title}`,
    //     course
    // })
})



router.get('/:id',async (req,res)=>{
    const course= await Course.findById(req.params.id)
    res.render('course',{
        layout:'empty',
        title:`Курсы ${course.title}`,
        course
    })
})



module.exports = router