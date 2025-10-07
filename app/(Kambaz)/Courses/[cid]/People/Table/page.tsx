import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

export default function PeopleTable() {
    return (
        <div id="wd-people-table">
            <Table striped hover>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Login ID</th>
                    <th>Section</th>
                    <th>Role</th>
                    <th>Last Activity</th>
                    <th>Total Activity</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="wd-full-name text-nowrap align-middle">
                        <FaUserCircle className="me-2 fs-1 text-secondary" />
                        <span className="wd-first-name">Tony</span>{" "}
                        <span className="wd-last-name">Stark</span>
                    </td>
                    <td className="wd-login-id align-middle">001234561S</td>
                    <td className="wd-section align-middle">S101</td>
                    <td className="wd-role align-middle">STUDENT</td>
                    <td className="wd-last-activity align-middle">2020-10-01</td>
                    <td className="wd-total-activity align-middle">10:21:32</td>
                </tr>
                <tr>
                    <td className="wd-full-name text-nowrap align-middle">
                        <FaUserCircle className="me-2 fs-1 text-secondary" />
                        <span className="wd-first-name">Bruce</span>{" "}
                        <span className="wd-last-name">Wayne</span>
                    </td>
                    <td className="wd-login-id align-middle">001234562S</td>
                    <td className="wd-section align-middle">S101</td>
                    <td className="wd-role align-middle">STUDENT</td>
                    <td className="wd-last-activity align-middle">2020-11-02</td>
                    <td className="wd-total-activity align-middle">15:32:43</td>
                </tr>
                <tr>
                    <td className="wd-full-name text-nowrap align-middle">
                        <FaUserCircle className="me-2 fs-1 text-secondary" />
                        <span className="wd-first-name">Steve</span>{" "}
                        <span className="wd-last-name">Rogers</span>
                    </td>
                    <td className="wd-login-id align-middle">001234563S</td>
                    <td className="wd-section align-middle">S101</td>
                    <td className="wd-role align-middle">STUDENT</td>
                    <td className="wd-last-activity align-middle">2020-10-10</td>
                    <td className="wd-total-activity align-middle">23:32:43</td>
                </tr>
                <tr>
                    <td className="wd-full-name text-nowrap align-middle">
                        <FaUserCircle className="me-2 fs-1 text-secondary" />
                        <span className="wd-first-name">Natasha</span>{" "}
                        <span className="wd-last-name">Romanoff</span>
                    </td>
                    <td className="wd-login-id align-middle">001234564S</td>
                    <td className="wd-section align-middle">S101</td>
                    <td className="wd-role align-middle">TA</td>
                    <td className="wd-last-activity align-middle">2020-11-05</td>
                    <td className="wd-total-activity align-middle">13:23:34</td>
                </tr>
                <tr>
                    <td className="wd-full-name text-nowrap align-middle">
                        <FaUserCircle className="me-2 fs-1 text-secondary" />
                        <span className="wd-first-name">Kris</span>{" "}
                        <span className="wd-last-name">Wang</span>
                    </td>
                    <td className="wd-login-id align-middle">001234565S</td>
                    <td className="wd-section align-middle">S101</td>
                    <td className="wd-role align-middle">STUDENT</td>
                    <td className="wd-last-activity align-middle">2020-12-01</td>
                    <td className="wd-total-activity align-middle">11:22:33</td>
                </tr>
                <tr>
                    <td className="wd-full-name text-nowrap align-middle">
                        <FaUserCircle className="me-2 fs-1 text-secondary" />
                        <span className="wd-first-name">Tingxun</span>{" "}
                        <span className="wd-last-name">Wang</span>
                    </td>
                    <td className="wd-login-id align-middle">001234566S</td>
                    <td className="wd-section align-middle">S101</td>
                    <td className="wd-role align-middle">STUDENT</td>
                    <td className="wd-last-activity align-middle">2020-12-01</td>
                    <td className="wd-total-activity align-middle">22:33:44</td>
                </tr>
                </tbody>
            </Table>
        </div>
    );
}