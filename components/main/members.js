import { masterService, TFM_MEMBERS } from "core/services";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const Memebers = () => {
    const [members, setMembers] = useState({});

    const loadCommonData = async () => {
        const resp = await masterService.getAll(TFM_MEMBERS);
        if (resp && resp?.meta?.code === 200) {
            const { data } = resp;
            setMembers(data);
        }
    };

    useEffect(() => {
        loadCommonData();
    }, []);

    return (
        <section className="page-section-pb">
            <Container>
                <Row>
                    <Col md={3} sm={6} className="d-flex">
                        <div className="counter left_pos">
                            <i className="glyph-icon flaticon-people-2"></i>
                            <span className="timer text-center" data-to="1600" data-speed="10000">
                                {members?.totalMembers}
                            </span>
                            <label className="lead muted form-label">Total Members</label>
                        </div>
                    </Col>
                    <Col md={3} sm={6} className="d-flex">
                        <div className="counter left_pos">
                            <i className="glyph-icon flaticon-favorite"></i>
                            <span className="timer text-center" data-to="750" data-speed="10000">
                                {members?.onlineMembers}
                            </span>
                            <label className="lead muted form-label">Online Members</label>
                        </div>
                    </Col>
                    <Col md={3} sm={6} className="d-flex">
                        <div className="counter left_pos">
                            <i className="glyph-icon flaticon-charity"></i>
                            <span className="timer text-center" data-to="380" data-speed="10000">
                                {members?.menOnline}
                            </span>
                            <label className="lead muted form-label">Men Online</label>
                        </div>
                    </Col>
                    <Col md={3} sm={6} className="d-flex">
                        <div className="counter left_pos">
                            <i className="glyph-icon flaticon-candelabra"></i>
                            <span className="timer text-center" data-to="370" data-speed="10000">
                                {members?.womenOnline}
                            </span>
                            <label className="lead muted form-label">Women Online</label>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Memebers;
