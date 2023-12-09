 const product = require('../models/product')
const getAllProductsStatic = async (req,res)=>{

    const search=''

    const products= await product.find({}).sort('name')
  
        res.status(200).json({products, nbHits: products.length})
}


const getAllProducts = async (req,res)=>{

    const {featured,company,name,sort,field }= req.query;
    const queryobj = {}
    if(featured){
        queryobj.featured=featured==='true'?true:false
    }
    if(company)
    {
        queryobj.company=company
    }
    if(name)
    {
        queryobj.name= {$regex: name,$option:'i'}
    }
    let result = product.find(queryobj)
    if(sort)
    {
        const sortList = sort.split(',').join('')
        result = result.sort(sortList)
    }
    else
    {
        result= result.sort('createdAt')
    }
    if(field)
    {
        const fieldsList = field.split(',').join(' ')
        result = result.select(fieldsList)
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit)|| 10
    const skip = (page-1)*limit
    result = result.skip(skip).limit(limit)

    const products= await result
    res.status(200).json({ nbHits: products.length,products})
}

module.exports ={
    getAllProducts, getAllProductsStatic
}