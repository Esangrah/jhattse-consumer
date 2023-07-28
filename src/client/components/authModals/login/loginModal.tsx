import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
} from '@chakra-ui/react'
import { Input } from 'antd'

const LoginModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create your Account</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <h2>Name</h2>
                                <Input type='text'
                                    className="p-2 border rounded"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h2>Email or Mobile Number</h2>
                                <Input type='text'
                                    className="p-2 border rounded"
                                />
                            </div>

                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default LoginModal