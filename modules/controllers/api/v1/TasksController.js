const Controller = require(`${path.controller}`);
const TaskTransform = require(`${path.transform}/v1/TaskTransform`)
const User = require(`${path.model}/User`);
const Task = require(`${path.model}/Task`);



module.exports = new class TaskController extends Controller {

    /**
     * Show  ALL Tasks Of Single User By name
     @param {} req
     @param {} res
     */
    index(req, res) {
        try {
            var query;

           Task.paginate(query,{
                page: parseInt(req.params.page) || 1,
                limit: parseInt(req.params.limit) || 30,
                sort: -req.params.order || {created: -1},
                populate: 'user',
            }).then(task => {
                console.log(task )
                

                if (task) {
                    return res.json({
                        ...new TaskTransform().withAuthor().withPaginate().transformCollection(task),
                        status: 'success'
                    });
                }

                res.json({
                    message: 'تسکی وجود ندارد',
                    status : 'empty'
                })

            })
        } catch (err) {
            console.log(err)

        }

    }


    async createTask(req, res) {
        try {
            Task.create({
                title: req.body.title,
                description: req.body.description,
                status: 'toDo',
                user: req.user.id
            }).then(async task => {

                if (task) {
                    await User.findByIdAndUpdate(req.user.id, {$addToSet: {tasks: task._id}});
                    return res.json({
                        message: 'پست متنی شما با موفقیت ذخیره گردید',
                        data: new TaskTransform().transform(task),
                        status: 'success'
                    });
                }

            })
        } catch (err) {
            console.log(err)
            return res.json({
                message: 'خطا : مشکلی در ذخیره سازی پست شما پیش آمد',
                status : 'error'
            })
        }
    }

    async changeStatus(req,res) {
        let StatusData = await Task.findById( req.params.id , 'status treasure review' )
        if(!StatusData) {
            return res.json({
                message : 'تسکی با این ای دی وجود ندارد',
                status : 'error',
            })
        }

        if(StatusData.status == "toDo" && req.body.status == "InProgress"){
            req.body.status = "InProgress";
        }else if(StatusData.status == "InProgress" && req.body.status == "Blocked"){
            req.body.status = "InProgress";
        }else if(StatusData.status == "InProgress" && req.body.status == "inQA"){
            req.body.status = "inQA";
        }else if(StatusData.status == "inQA" && req.body.status == "toDo"){
            req.body.status = "toDo";
        }else if(StatusData.status == "inQA" && req.body.status == "Done"){
            req.body.status = "Done";
        }else if(StatusData.status == "Done" && req.body.status == "Deployed"){
            req.body.status = "Deployed";
        }else if(StatusData.status == "Deployed" && req.body.status == "Deployed"){
            req.body.status = "Deployed";
        }else if(StatusData.status == "Blocked" && req.body.status == "toDo"){
            req.body.status = "toDo";
        }else {
            return res.json({
                message : `به دلیل این که وضعیت تسک شما ${StatusData.status} بوده است
                اجازه تغییر به ${req.body.status} را ندارید`,
                status : 'error',
            })

        }
        await  Task.findByIdAndUpdate(req.params.id, { status : req.body.status } , {new : true}).then((response) =>{

            if (!response){
                return res.json({
                    message : 'چنین تسکی وجود ندارد',
                    status : '404',
                }).end()
            }
            res.json({
                message :  'پست با موفقیت در حالت انتشار قرار گرفت',
                data : new TaskTransform().transform(response),
                status : 'success',
            }).end()
        }).catch((err) =>{
            console.log(err)});

    }
}
