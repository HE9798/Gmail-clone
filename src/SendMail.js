import React from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form' 
import firebase from 'firebase'
import { closeSendMessage } from './features/mailSlice'
import './SendMail.css'

import { Button } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { db } from './firebase'

function SendMail() {

    const dispatch = useDispatch()

    const { register, handleSubmit, watch, formState: {errors} } = useForm()

    const onSubmit = (formData) => {
        console.log(formData)
        db.collection('emails').add({
            to: formData.to,
            subject: formData.subject,
            message: formData.message,
            timeStamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        dispatch(closeSendMessage())
    }

    return (
        <div className="sendMail">
            <div className="sendMail__header">
                <h3>New Message</h3>
                <CloseIcon onClick={() => dispatch(closeSendMessage())} className="sendMail__close" />
            </div>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <input placeholder="To" type="email" {...register('to', { required: true })} />
                { errors.to && <p className="sendMail__error">To is Required!</p> }
                <input placeholder="Subject" type="text" {...register('subject', { required: true })}  />
                { errors.subject && <p className="sendMail__error">Subject is Required!</p> }
                <input placeholder="Message..." type="text" className="sendMail__message" {...register('message', { required: true })} />
                { errors.message && <p className="sendMail__error">Message is Required!</p> }
                <div className="sendMail__options">
                    <Button 
                        className="sendMail__send"
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Send
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SendMail
