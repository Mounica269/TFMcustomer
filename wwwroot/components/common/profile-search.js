import { useRouter } from "next/router";
import { Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { usersService } from "core/services";
import { utils } from "core/helper";
import { Fragment } from "react";

const validationSchema = Yup.object().shape({
    profileId: Yup.string().required("Requried field"),
});

const ProfileSearch = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const router = useRouter();

    const onSubmit = async (values) => {
        const { profileId } = values;
        const resp = await usersService.isValid(values);
        if (resp && resp.data === true) {
            router.push(`/profile?profileId=${profileId}`);
        } else {
            utils.showErrMsg("Profile Id not found");
            return false;
        }
    };

    return (
        <Fragment>
                    <div class="db-nav">
            <div class="db-nav-list">
                
            <h5>Profile ID Search</h5>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col md={9}>
                            <Form.Control
                                placeholder="Enter Profile ID"
                                {...register("profileId")}
                                type="text"
                                className="py-1"
                            />
                            <p className="text-danger">{errors.profileId?.message}</p>
                        </Col>
                        <Col md={3}>
                            <button
                                disabled={isSubmitting}
                                type="submit"
                                className="btn btn-outline-danger btn-sm"
                            >
                                GO
                            </button>
                        </Col>
                    </Row>
                </Form>
                </div>
        </div>

        </Fragment>
    );
};

export default ProfileSearch;
