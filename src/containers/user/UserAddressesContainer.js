import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import { useTranslation, i18n } from 'react-i18next';


const UserAddressesContainer = (props) => {

    const [hover, setHover] = useState({})
    const navigation = useNavigate()
    const { t } = useTranslation();
    
    useEffect(() => {

        const fetchData = async () => { }

    })

    const sidebar = (
        <div className='col-md-2'>
            <div
                className='row'
                style={{
                    marginTop: '5%',
                    cursor: 'pointer',
                    textDecoration: hover.id === 0 && hover.status ? 'underline' : ''
                }}
                onMouseEnter={() => setHover({ id: 0, status: true })}
                onMouseLeave={() => setHover({ id: 0, status: false })}
                onClick={(e) => {
                    navigation('/user/account')
                }}
            >
                <span>{t('user.my-data')}</span>
            </div>
            <div
                className='row'
                style={{
                    marginTop: '5%',
                    cursor: 'pointer',
                    textDecoration: hover.id === 1 && hover.status ? 'underline' : ''
                }}
                onMouseEnter={() => setHover({ id: 1, status: true })}
                onMouseLeave={() => setHover({ id: 1, status: false })}
                onClick={(e) => {
                    navigation('/user/returns')
                }}
            >
                <span>{t('user.returns')}</span>
            </div>
            <div
                className='row'
                style={{
                    marginTop: '5%',
                    cursor: 'pointer',
                    textDecoration: hover.id === 2 && hover.status ? 'underline' : ''
                }}
                onMouseEnter={() => setHover({ id: 2, status: true })}
                onMouseLeave={() => setHover({ id: 2, status: false })}
                onClick={(e) => {
                    navigation('/user/return-form')
                }}
            >

                <span>{t('user.init-return')}</span>
            </div>
            <div
                className='row'
                style={{
                    marginTop: '5%',
                    cursor: 'pointer',
                    textDecoration: hover.id === 3 && hover.status ? 'underline' : ''
                }}
                onMouseEnter={() => setHover({ id: 3, status: true })}
                onMouseLeave={() => setHover({ id: 3, status: false })}
                onClick={(e) => {
                    navigation('/user/orders')
                }}
            >

                <span>{t('user.orders')}</span>
            </div>
            <div
                className='row'
                style={{
                    marginTop: '5%',
                    cursor: 'pointer',
                    textDecoration: hover.id === 4 && hover.status ? 'underline' : ''
                }}
                onMouseEnter={() => setHover({ id: 4, status: true })}
                onMouseLeave={() => setHover({ id: 4, status: false })}
                onClick={(e) => {
                    navigation('/user/addresses')
                }}
            >

                <span>{t('user.addresses')}</span>
            </div>
            <div
                className='row'
                style={{
                    marginTop: '5%',
                    cursor: 'pointer',
                    textDecoration: hover.id === 5 && hover.status ? 'underline' : ''
                }}
                onMouseEnter={() => setHover({ id: 5, status: true })}
                onMouseLeave={() => setHover({ id: 5, status: false })}
                onClick={(e) => {
                    navigation('/user/favorites')
                }}
            >
                <span>{t('user.wishlist')}</span>
            </div>
        </div>
    )


    const divider = (
        (
            <hr style={{
                marginTop: '3%',
                marginBottom: '3%'
            }} class="solid">
            </hr>
        )
    )

    const content = (
        <>
            <div className=''
                style={{
                    marginTop: '5%',
                    display: 'flex',
                    justifyContent: 'start'
                }}>
                <div className='col-md-4'>
                    <div className='row'>
                        <label>{t("user.name")}</label>
                        <span>Jakub Ś</span>
                    </div>

                </div>
                <div className='col-md-4'>
                    <div className='row'>
                        <label>{t('user.lastname')}</label>
                        <span>730163500</span>
                    </div>
                </div>
                <Button style={{
                    marginLeft: 'auto'
                }}>
                    Edytuj
                </Button>
            </div>
            <div className=''
                style={{
                    marginTop: '5%',
                    display: 'flex',
                    justifyContent: 'start'
                }}>
                <div className='col-md-4'>
                    <div className='row'>
                        <label>{t('user.name')}</label>
                        <span>Jakub Ś</span>
                    </div>

                </div>
                <div className='col-md-4'>
                    <div className='row'>
                        <label>{t('user.number')}</label>
                        <span>730163500</span>
                    </div>
                </div>

            </div>

            {divider}
            <div className='' style={{ //tu zmien na row kiedy okienko jest mniejsze, a usun kiedy wiesze wtedy button sie dobrze uklada
                marginTop: '5%',
                display: 'flex',
                justifyContent: 'start'
            }}>
                <div className='col-md-4'>
                    <div className='row'>
                        <label>{t('user.email')}</label>
                        <span>jjakubs@wp.pl</span>
                    </div>
                </div>
                <Button style={{
                    marginLeft: 'auto'
                }}>
                    {t('global.edit-button')}
                </Button>
            </div>
            {divider}
            <div className='' style={{
                marginTop: '5%',
                display: 'flex',
                justifyContent: 'start'
            }}>
                <div className='col-md-4'>
                    <div className='row'>
                        <label>{t('user.password')}</label>
                        <span>********</span>
                    </div>
                </div>
                <Button style={{
                    marginLeft: 'auto'
                }}>
                    {t('global.edit-button')}
                </Button>
            </div>
            {divider}
        </>
    )


    return (
        <div className='row'
            style={{
                marginLeft: '20%',
                marginRight: '20%',
                marginTop: '5%'
            }}>
            {sidebar}
            <div className='col-md-6' style={{
                marginLeft: "12%"
            }}>
                {content}
            </div>

        </div>
    )
}

export default UserAddressesContainer;
