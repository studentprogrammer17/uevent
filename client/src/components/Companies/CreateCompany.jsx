import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SpinnerLoading from "../Other/Spinner";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const COMPANY_REGEX = /^[a-zA-Zа-яА-Яє-їЄ-Ї0-9_/\s/\.]{3,23}$/;
const DESCR_REGEX = /^[a-zA-Zа-яА-Яє-їЄ-Ї0-9,-_!?%$#@^&*\\\.();:`~"/\s/\.]{10,10000}$/;

const CreateCompany = () => {
    const lang = localStorage.getItem('lang');
    const errRef = useRef();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('autorized'));
    const [errMsg, setErrMsg] = useState('');

    const [companyName, setCompanyName] = useState('');
    const [validCompanyName, setValidCompanyName] = useState(false);

    const [companyDescr, setCompanyDescr] = useState('');
    const [validcompanyDescr, setValidCompanyDescr] = useState(false);
    const [companyLogo, setCompanyLogo] = useState('')
    const [isLoading, setLoading] = useState(false);

    const currentUser = JSON.parse(localStorage.getItem('autorized'));

    useEffect(() => {
        setValidCompanyName(COMPANY_REGEX.test(companyName));
    }, [companyName]);

    useEffect(() => {
        setValidCompanyDescr(DESCR_REGEX.test(companyDescr));
    }, [companyDescr]);


    const setHidden = () => {
        setTimeout(() => setErrMsg(''), 5000);
    }
    const addImage = async (e) => {
        const formData = new FormData();
        console.log(e.target.files[0]);
        formData.append('image', e.target.files[0]);
        try {
            const response = await axios.post(`/api/companies/add-image/${currentUser.accessToken}`, formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true
                }
            )
            console.log(response);
            setCompanyLogo(response.data.values.values.pathFile);
        } catch (e) {
            console.log(e);
        }
    }
    const createCompany = async (e) => {
        e.preventDefault();
        console.log(companyDescr, companyName, currentUser.userId, companyLogo)
        try {
            setLoading(true);
            const response = await axios.post(`/api/companies/${currentUser.accessToken}`, JSON.stringify(
                { description: companyDescr, title: companyName, userId: currentUser.userId, company_pic: companyLogo || 'default_company.png' }), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
            // console.log(response);
            setLoading(false);
            navigate(`/companies/?page=1`);
            document.location.reload();
        }
        catch (err) {
            setLoading(false);
            console.log(err);
            if (err?.response.data.status === 404) {
                navigate('/404');
            }
            else {
                navigate('/500')
            }
        }
    }
    return (
        <>
            <div className="form-background p-5 d-flex justify-content-center text-white">
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

                <div className='login bg-dark text-white rounded d-flex flex-column p-3 justify-content-center'>
                    <h2 className="text-center">{lang === 'ua' ? 'Створити Компанію' : 'Create Company'}</h2>
                    <form className="d-flex flex-column  justify-content-center" onSubmit={createCompany}>
                        <Form.Label className="form_label" htmlFor="compName">{lang === 'ua' ? 'Назва Компанії' : 'Company Name'}
                            <FontAwesomeIcon icon={faCheck} className={validCompanyName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validCompanyName || !companyName ? "hide" : "invalid"} />
                        </Form.Label>
                        <Form.Control
                            type="text"
                            className="bg-dark text-white mb-3"
                            id="compName"
                            autoComplete="off"
                            onChange={(e) => setCompanyName(e.target.value)}
                            value={companyName}
                        />

                        <Form.Label className="form_label" htmlFor="compDescr">{lang === 'ua' ? 'Опис Компанії' : 'Company Description'}
                            <FontAwesomeIcon icon={faCheck} className={validcompanyDescr ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validcompanyDescr || !companyDescr ? "hide" : "invalid"} />
                        </Form.Label>
                        <textarea
                            className="bg-dark text-white mb-3 p-2"
                            id="compDescr"
                            rows="3"
                            autoComplete="off"
                            onChange={(e) => setCompanyDescr(e.target.value)}
                            value={companyDescr}
                        >
                        </textarea>
                        <Form.Control
                            type="file"
                            className="bg-dark text-white mb-3"
                            id="posteer"
                            autoComplete="off"
                            accept="image/jpeg,image/png,image/jpg"
                            onChange={addImage}
                        // value={eventPoster}
                        />

                        <Button variant="secondary" type="submit" disabled={!validCompanyName || !validcompanyDescr || isLoading ? true : false}>{isLoading ? <SpinnerLoading /> : lang === 'ua' ? 'Створити' : 'Create'}</Button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateCompany;