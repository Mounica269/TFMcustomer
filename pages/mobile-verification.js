import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    otp: Yup.number().required("OTP is required"),
});

const MobileVerification = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
        reset,
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = (values) => {};

    return (
        <section className="page-section-ptb4 pb-6">
            <Container>
                <Row className="d-flex justify-content-center">
                    <Col md={6} className="mb-2">
                        <Card className="card">
                            <div className="card-body text-cente">
                                <div className="bg-success text-center">
                                    <div className="text-white">
                                        <h1>
                                            <i className="fa fa-mobile" aria-hidden="true"></i>
                                        </h1>
                                    </div>
                                </div>
                                <h1 className="text-success mobile-verify-title">
                                    Mobile Number Verification!
                                </h1>
                                <p className="mobile-verify-content">
                                    Enter the code we just send on your mobile phone +91 0987654321
                                </p>
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="d-flex justify-content-center flex-row text-center">
                                        <Form.Control
                                            type="num"
                                            className="form-control mr-1 w-50"
                                            {...register("otp")}
                                        />
                                    </div>
                                    <p>{errors.otp?.message}</p>
                                    <div className="text-center mt-3">
                                        <Button type="submit" className="btn-sm">
                                            Submit
                                        </Button>
                                        <span className="d-block mobile-text mt-3">
                                            Don't receive the code?
                                        </span>
                                        <button
                                            type="submit"
                                            className="font-weight-bold text-danger border-0 bg-transparent"
                                        >
                                            Resend
                                        </button>
                                    </div>
                                </Form>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default MobileVerification;
