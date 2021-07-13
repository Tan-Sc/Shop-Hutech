import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'

const initialState = {
    title: '',
    brand: '',
    series: '',
    warranty: '',
    prices: 0,
    description: '',
    quantity: 0,
    category: '',
    content: {}
}
let inforTT = '';
function CreateProduct(props) {
    const state = useContext(GlobalState)
    const { categories } = props
    const [token] = state.token;
    const [isAdmin] = state.UserAPI.isAdmin
    const [product, setProduct] = useState(initialState);
    const [computer, setComputer] = useState({
        cpu: '',
        vga: '',
        ram: '',
        screen: '',
        harddisk: '',
        opearatingSysterm: '',
        battery: '',
        weight: ''
    })
    const [ram, setRam] = useState({
        BUS: '',
        generation: ''
    })
    const [harddisk, setDisk] = useState({
        type: '',
        gate: '',
        size: ''
    })
    const [images, setImages] = useState(false)
    const [callback, setCallback] = state.ProductAPI.callback

    const history = useHistory();
    const param = useParams();

    /* update Product */
    const [products] = state.ProductAPI.products
    const [onEdit, setOnEdit] = useState(false)
    const brandCollection = ['HP', 'ASUS', 'Dell', 'Lenovo', 'MSI', 'LG', 'Avita', 'MICROSOFT', 'Huawei', "Acer"]
    const RAMBUS = ['2400MHz', '2666MHz', '3000MHz', '3200MHz', '1600MHz', '2800MHz', ' 3600MHz'];
    const RAMBrand = ['G.SKILL', 'KINGSTON', 'KINGMAX', 'CRUCIAL', 'ADATA', 'CORSAIR', 'GEIL', 'KLEVV', 'GIGABYTE'];
    const RAMCapacity = ['1 x 8GB', '1 x 4GB', '2 x 8GB', '1 x 16GB', '2 x 16GB', '2 x 4GB', '2 x 32GB'];
    const RAMGeneration = ['DDR4', 'DDR3', 'DDR3L'];
    const HarddiskBrand = ['WD', 'SEAGATE', 'SAMSUNG', 'ORICO', 'TRANSCEND', 'KINGSTON', 'LACIE', 'CRUCIAL', 'GIGABYTE']
    const batteryCollection = ['2 Cell', '3 Cell', '4 Cell'];
    const screenCollection = ['15.6"', '14"', '13.3"', '17.3"', '15"', '11.6"', '12.3"', '13.5"', '17"', '12"', '13"']
    const cpuCollection = ['Intel Core i3', 'Intel Core i5', 'Intel Core i7', 'Intel Core i9', 'ADM Ryzen 3', 'ADM Ryzen 5', 'ADM Ryzen 7', 'ADM Ryzen 9'];
    const opearatingSystermColelecttion = ['Home Window', 'Profesional Window', "MacOS", "Linux"];
    const harddiskCollection = ['SSD 128 GB', 'SSD 256 GB', 'SSD 512 GB', 'HDD 1 TB', 'HDD 2 TB'];
    const vgaCollection = ['NVIDIA GeForce GTX 1650',
        'NVIDIA GeForce GTX 1050', 'NVIDIA GeForce GTX 1650Ti', 'NVIDIA GeForce GTX 1660Ti', 'NVIDIA GeForce MX250', 'NVIDIA GeForce MX150',
        'NVIDIA GeForce MX130', 'NVIDIA GeForce MX230', 'NVIDIA GeForce RTX 2060', 'NVIDIA GeForce GTX 1050Ti', 'AMD Radeon 530', 'NVIDIA GeForce GTX 1060',
        'NVIDIA GeForce MX330', 'NVIDIA GeForce RTX 2070 Super', 'NVIDIA GeForce MX350', 'AMD Radeon 520', 'NVIDIA GeForce 940MX', 'NVIDIA GeForce RTX 2070',
        'AMD Radeon 610', 'AMD Radeon R5 520', 'NVIDIA GeForce RTX 2080',
        'AMD Radeon RX 550X', 'AMD Radeon RX 560X', 'AMD Radeon RX 5500M', 'R19M-M18-50 (R625)', 'NVIDIA GeForce MX450', 'AMD Radeon R7 M530']
    const capacity = ['1TB', '2TB', '4TB', '500GB', '120GB', '250GB', '256GB', '128GB', '3TB', '6TB', '512GB']
    useEffect(() => {
        if (param.id) {
            setOnEdit(true)
            products.forEach(product => {
                if (product._id === param.id) {
                    console.log(product);
                    setProduct(product)
                    setImages(product.images)
                }
            })
        }
        else {
            setOnEdit(false)
            setProduct(initialState)
            setImages(false)
        }
    }, [param.id, products])

    const handleUpload = async e => {
        e.preventDefault();
        try {
            const file = e.target.files[0]
            console.log(file);
            // console.log(file);
            if (!file) return alert('file not exists')
            let formData = new FormData()
            formData.append('file', file);
            const res = await axios.post('/images/upload', formData, {
                headers: { 'content-type': 'multipart/form-data', Authorization: token }
            })
            console.log(res, 'res');
            setImages(res.data)
        } catch (error) {
            return alert(error.response.data.msg)
        }
    }
    const handleDelete = async () => {
        try {
            if (!token) return alert('not upload')
            await axios.post('/images/delete', { public_id: images.public_id }, {
                headers: { Authorization: token }
            })
            setImages(false)
        } catch (error) {
            alert(error.response.data.msg)
        }
    }
    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setProduct({ ...product, [name]: value });
    }
    const handleChangeInputComputer = (e) => {
        const { name, value } = e.target
        setComputer({ ...computer, [name]: value });
        setProduct({ ...product, content: { ...computer, [name]: value } });
    }
    const handleChangeInputRam = (e) => {
        const { name, value } = e.target
        setRam({ ...ram, [name]: value });
        setProduct({ ...product, content: { ...ram, [name]: value } });
    }
    const handleChangeInputDisk = (e) => {
        const { name, value } = e.target
        setDisk({ ...harddisk, [name]: value });
        setProduct({ ...product, content: { ...harddisk, [name]: value } });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(product.category);
        try {
            // console.log(product.category, 'xxxxxxx');
            if (product.category === 'laptop') {
                inforTT = `${product.title} ( ${computer.cpu}|${computer.vga}|${computer.ram}|${computer.screen}|${computer.harddisk}|
                    ${computer.opearatingSysterm}|${computer.battery}|${computer.weight}`
            }
            else if (product.category === 'ram') {
                inforTT = `${product.title} (${ram.BUS}|${ram.capacity}|${ram.generation})`
            }
            else if (product.category === 'harddisk') {
                inforTT = `${product.title} (${harddisk.type}|${harddisk.size}|${harddisk.gate}|${harddisk.capacity})`
            }
            else {
                inforTT = product.title
            }
            if (!isAdmin) return alert('you are not admin')
            if (!images) return alert('no images upload')
            if (onEdit) {
                await axios.post(`/products/update/${param.id}`, { ...product, images, title: inforTT }, {
                    headers: { Authorization: token }
                })
            }
            else {
                await axios.post('/products/create', { ...product, images, title: inforTT }, {
                    headers: { Authorization: token }
                })
            }
            // setImages(false)
            // setProduct(initialState)
            setCallback(!callback)
            history.push("/products");
        } catch (error) {
            alert(error.response.data.msg)
        }
    }
    /*end create*/
    const styleUpload = {
        display: images ? 'block' : 'none'
    }

    return (
        <div className='create-product'>
            <div className='add-images'>
                <input type='file' className='images' id='file' name='file' onChange={handleUpload} />
                <div id='file-img' style={styleUpload}>
                    <img src={images ? images.url : ''} alt='' />
                    <span onClick={handleDelete}>X</span>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='category'>Category: </label>
                    <select name='category' onChange={handleChangeInput}>
                        <option defaultValue={product.category}>{(product.category) ? product.category : ""}</option>
                        {
                            categories.map(category => {
                                return <option key={category._id}> {category.name}</option>
                            })
                        }
                    </select>
                </div>
                <div className='form-group'>
                    <label htmlFor='brand'>Brand: </label>
                    {
                        (product.category === 'laptop' || product.category === 'ram' || product.category === 'harddisk') ?
                            <select name='brand' onChange={handleChangeInput}>
                                <option defaultValue={(product.brand)}>{(product.brand) ? product.brand : "Choose"}</option>
                                {
                                    (product.category === 'laptop') ?
                                        brandCollection.map((item, index) => {
                                            return <option key={index}> {item}</option>
                                        }) : (product.category === 'ram') ?
                                            RAMBrand.map((item, index) => {
                                                return <option key={index}> {item}</option>
                                            }) :
                                            HarddiskBrand.map((item, index) => {
                                                return <option key={index}> {item}</option>
                                            })

                                }
                            </select>
                            :
                            <input type='text' id='brand' name='brand' value={product.brand} onChange={handleChangeInput} />
                    }

                </div>
                <div className='form-group'>
                    <label htmlFor='warranty'>Warranty: </label>
                    <select name='warranty' onChange={handleChangeInput}>
                        <option defaultValue>{(product.warranty) ? product.warranty : "Choose"}</option>
                        <option value="6 months">6 months</option>
                        <option value="12 months">12 months</option>
                        <option value="18 months">18 months</option>
                        <option value="24 months">24 months</option>

                    </select>
                </div>
                <div className='form-group'>
                    <label htmlFor='series'>Series: </label>
                    <input type='text' id='series' name='series' value={product.series} onChange={handleChangeInput} />
                </div>
                <div className='form-group'>
                    <label htmlFor='title'>Title: </label>
                    <input type='text' id='title' name='title' placeholder='add title' value={product.title} onChange={handleChangeInput} />
                </div>
                <div className='form-group'>
                    <label htmlFor='prices'>Prices: </label>
                    <input type='number' id='prices' name='prices' placeholder='add prices' value={product.prices} onChange={handleChangeInput} />
                </div>
                {
                    (product.category === 'laptop') ?
                        (
                            <>
                                <div className="item-box">
                                    <div className='form-group cpu'>
                                        <label htmlFor='cpu'>CPU: </label>
                                        <select name='cpu' onChange={handleChangeInputComputer}>
                                            <option defaultValue={product.content.cpu}>{(product.content) ? product.content.cpu : ""}</option>
                                            {
                                                cpuCollection.map((item, index) => {
                                                    return <option key={index} value={item}> {item}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className='form-group ram'>
                                        <label htmlFor='ram'>RAM: </label>
                                        <select name='ram' onChange={handleChangeInputComputer}>
                                            <option defaultValue={product.content.ram}>{(product.content) ? product.content.ram : ""}</option>
                                            {
                                                RAMCapacity.map((item, index) => {
                                                    return <option key={index} value={item}> {item}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className='form-group screen'>
                                        <label htmlFor='screen'>Screen: </label>
                                        <select name='screen' onChange={handleChangeInputComputer}>
                                            <option defaultValue={product.content.screen}>{(product.content) ? product.content.screen : ""}</option>
                                            {
                                                screenCollection.map((item, index) => {
                                                    return <option key={index} value={item}> {item}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="item-box">
                                    <div className='form-group vga'>
                                        <label htmlFor='vga'>VGA: </label>
                                        <select name='vga' onChange={handleChangeInputComputer}>
                                            <option defaultValue={product.content.vga}>{(product.content) ? product.content.vga : ""}</option>
                                            {
                                                vgaCollection.map((item, index) => {
                                                    return <option key={index} value={item}> {item}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className='form-group harddisk'>
                                        <label htmlFor='harddisk'>Hard Disk: </label>
                                        <select name='harddisk' onChange={handleChangeInputComputer}>
                                            <option defaultValue={product.content.harddisk}>{(product.content) ? product.content.harddisk : ""}</option>
                                            {
                                                harddiskCollection.map((item, index) => {
                                                    return <option key={index} value={item}> {item}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='oparatingSystem'>Oparating System: </label>
                                    <select name='opearatingSysterm' onChange={handleChangeInputComputer}>
                                        <option defaultValue={product.content.opearatingSysterm}>{(product.content) ? product.content.opearatingSysterm : ""}</option>
                                        {
                                            opearatingSystermColelecttion.map((item, index) => {
                                                return <option key={index} value={item}> {item}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='battery'>Battery: </label>
                                    <select name='battery' onChange={handleChangeInputComputer}>
                                        <option defaultValue={product.content.battery}>{(product.content) ? product.content.battery : ""}</option>
                                        {
                                            batteryCollection.map((item, index) => {
                                                return <option key={index} value={item}> {item}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='ram'>Weight: </label>
                                    <input type='text' id='weight' name='weight' onChange={handleChangeInputComputer} />
                                </div>
                            </>
                        ) : (product.category === 'ram') ? (
                            <>
                                <div className='form-group'>
                                    <label htmlFor='BUS'>BUS: </label>
                                    <select name='BUS' onChange={handleChangeInputRam}>
                                        <option defaultValue={product.content.BUS}>{(product.content) ? product.content.BUS : ""}</option>
                                        {
                                            RAMBUS.map((item, index) => {
                                                return <option key={index} value={item}> {item}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='capacity'>Capacity: </label>
                                    <select name='capacity' onChange={handleChangeInputRam}>
                                        <option defaultValue={product.content.capacity}>{(product.content) ? product.content.capacity : ""}</option>
                                        {
                                            RAMCapacity.map((item, index) => {
                                                return <option key={index} value={item}> {item}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='generation'>Generation: </label>
                                    <select name='generation' onChange={handleChangeInputRam}>
                                        <option defaultValue={product.content.generation}>{(product.content) ? product.content.generation : ""}</option>
                                        {
                                            RAMGeneration.map((item, index) => {
                                                return <option key={index} value={item}> {item}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </>
                        )
                            : (product.category === 'harddisk') ?
                                <>
                                    <div className='form-group'>
                                        <label htmlFor='type'>Type: </label>
                                        <select name='type' onChange={handleChangeInputDisk}>
                                            <option defaultValue={product.content.type}>{(product.content) ? product.content.type : ""}</option>
                                            <option value="SSD">SSD</option>
                                            <option value="HDD">HDD</option>
                                        </select>
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='capacity'>Capacity: </label>
                                        <select name='capacity' onChange={handleChangeInputDisk}>
                                            <option defaultValue={product.content.capacity}>{(product.content) ? product.content.capacity : ""}</option>
                                            {
                                                capacity.map((item, index) => {
                                                    return <option key={index} value={item}> {item}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='gate'>Connect Gate: </label>
                                        <select name='gate' onChange={handleChangeInputDisk}>
                                            <option defaultValue={product.content.gate}>{(product.content) ? product.content.gate : ""}</option>
                                            <option value="SATA 3">SATA 3</option>
                                            <option value="USB 3.0">USB 3.0</option>
                                            <option value="USB 3.1">USB 3.1</option>
                                            <option value="USB 3.2">USB 3.2</option>
                                            <option value="M.2 SATA">M.2 SATA</option>

                                        </select>
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='size'>Size: </label>
                                        <select name='size' onChange={handleChangeInputDisk}>
                                            <option defaultValue={product.content.size}>{(product.content) ? product.content.size : ""}</option>
                                            <option value='2.5"'>2.5"</option>
                                            <option value='3.5"'>3.5"</option>
                                            <option value='M.2 2280'>M.2 2280</option>
                                            <option value='M.2'>M.2</option>


                                        </select>
                                    </div>

                                </>
                                : <>

                                </>
                }
                <div className='form-group'>
                    <label htmlFor='description'>description: </label>
                    <textarea type='text' id='description' name='description' placeholder='add description' value={product.description} onChange={handleChangeInput} />
                </div>
                <div className='form-group'>
                    <label htmlFor='quantity'>quantity: </label>
                    <input type='number' id='quantity' name='quantity' placeholder='add quantity' value={product.quantity} onChange={handleChangeInput} />
                </div>
                <button type='submit'>Save</button>
            </form>
        </div>
    );
}

export default CreateProduct