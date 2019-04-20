import React, { Component } from 'react';
import './attendance.scss';

import StudentAttend from './studentAttend';
import TeacherAttend from './teacherAttend';

/**
 * 考勤功能。
 * @author Tinybo
 * @date 2019 04 19
 */
class Attendance extends Component {
    constructor () {
        super();
    }

    render () {
        let type = localStorage.getItem('type');

        return (
            <div className="attendanceContainer">
                { 
                    this.props.children
                }
            </div>
        )
    }
}

export default Attendance;