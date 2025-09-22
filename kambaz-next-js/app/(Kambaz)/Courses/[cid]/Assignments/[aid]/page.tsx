export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <label htmlFor="wd-name">Assignment Name</label>
            <br />
            <input id="wd-name" defaultValue="A1" />
            <br />
            <br />

            <textarea id="wd-description">
Complete all the Lab exercises and Kambaz exercises described in Chapter 1 of
Developing Full Stack Next.js Web Applications.
Submit a link to the landing page of your Web application running on Vercel.
The landing page should be the Kambaz application with a link to the Lab exercises.
Lab 1 should be the landing page of the Lab exercises and should include the following:
- Your full name and section
- Links to each of the lab assignments
- Link to the Kambaz application
- Links to all relevant source code repositories
The Kambaz application should include a link to navigate back to the landing page.
      </textarea>

            <br />
            <table>
                <tbody>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-points">Points</label> {/* clicking selects the field */}
                    </td>
                    <td>
                        <input id="wd-points" defaultValue={100} />
                    </td>
                </tr>

                <tr>
                    <td align="right">
                        <label htmlFor="wd-group">Assignment Group</label>
                    </td>
                    <td>
                        <select id="wd-group" defaultValue="ASSIGNMENTS">
                            <option>ASSIGNMENTS</option>
                            <option>QUIZZES</option>
                            <option>EXAMS</option>
                            <option>PROJECT</option>
                        </select>
                    </td>
                </tr>

                <tr>
                    <td align="right">
                        <label htmlFor="wd-display-grade-as">Display Grade as</label>
                    </td>
                    <td>
                        <select id="wd-display-grade-as" defaultValue="Percentage">
                            <option>Percentage</option>
                            <option>Points</option>
                            <option>Letter Grade</option>
                        </select>
                    </td>
                </tr>

                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-submission-type">Submission Type</label>
                    </td>
                    <td>
                        <select id="wd-submission-type" defaultValue="Online">
                            <option>Online</option>
                            <option>On Paper</option>
                            <option>No Submission</option>
                        </select>

                        <div>
                            <div>
                                <input id="wd-text-entry" type="checkbox" />
                                <label htmlFor="wd-text-entry">Text Entry</label>
                            </div>
                            <div>
                                <input id="wd-website-url" type="checkbox" defaultChecked />
                                <label htmlFor="wd-website-url">Website URL</label>
                            </div>
                            <div>
                                <input id="wd-media-recordings" type="checkbox" />
                                <label htmlFor="wd-media-recordings">Media Recordings</label>
                            </div>
                            <div>
                                <input id="wd-student-annotation" type="checkbox" />
                                <label htmlFor="wd-student-annotation">Student Annotation</label>
                            </div>
                            <div>
                                <input id="wd-file-upload" type="checkbox" />
                                <label htmlFor="wd-file-upload">File Uploads</label>
                            </div>
                        </div>
                    </td>
                </tr>

                <tr>
                    <td align="right">
                        <label htmlFor="wd-assign-to">Assign Assign to</label>
                    </td>
                    <td>
                        <select id="wd-assign-to" defaultValue="Everyone">
                            <option>Everyone</option>
                        </select>
                    </td>
                </tr>

                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-due-date">Due</label> {/* clicking focuses date input */}
                    </td>
                    <td>
                        <input id="wd-due-date" type="date" defaultValue="2024-05-13" />
                    </td>
                </tr>

                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-available-from">Available from</label>
                    </td>
                    <td>
                        <input id="wd-available-from" type="date" defaultValue="2024-05-06" />
                        &nbsp; <label htmlFor="wd-available-until">Until</label> &nbsp;
                        <input id="wd-available-until" type="date" defaultValue="2024-05-20" />
                    </td>
                </tr>

                <tr>
                    <td />
                    <td>
                        <button>Cancel</button>
                        <button>Save</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}