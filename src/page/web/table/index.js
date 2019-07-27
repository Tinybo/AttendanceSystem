import React, { Component } from 'react';
import './table.scss';
import { Table, Input, Button, Icon } from 'antd';
import Highlighter from 'react-highlight-words';

/**
 * 表格组件。
 * @author Tinybo
 * @date 2019 05 12
 */

class SelfTable extends Component {
    constructor () {
        super();
    }

    state = {
        searchText: '',
    };

    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
          setSelectedKeys, selectedKeys, confirm, clearFilters,
        }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => { this.searchInput = node; }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm)}
              icon="search"
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Search
            </Button>
            <Button
              onClick={() => this.handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </div>
        ),
        filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => this.searchInput.select());
          }
        },
        render: (text) => (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.searchText]}
            autoEscape
            textToHighlight={text && text.toString()}
          />
        ),
      })
    
    handleSearch = (selectedKeys, confirm) => {
      confirm();
      this.setState({ searchText: selectedKeys[0] });
    }
    
    handleReset = (clearFilters) => {
        clearFilters();
        this.setState({ searchText: '' });
    }

    /**
     * 显示请假详细信息。
     * @author Tinybo
     * @date 2019 05 14
     * @memberof SelfTable
     */
    showItem = (data) => {
      const { type, active, getCourseInfo, courseInfo } = this.props;
      let count = 0;

      if (type == 'leave' && active == 1) {
        return (
          <div className="leaveDetail">
            <span>流水号： { data.id }</span>
            <span>姓名：{ data.name }</span>
            <span>学号：{ data.num }</span>
            <span>系别：{ data.department }</span>
            <span>专业：{ data.major }</span>
            <span>年级：{ data.grade }</span>
            <span>班级：{ data.class }</span>
            <span>开始时间：{ data.startTime }</span>
            <span>结束时间：{ data.endTime }</span>
            <span>创建时间：{ data.createTime }</span>
            <span>请假事由：{ data.reason }</span>
            <span>手机号：{ data.phone }</span>
            <span>qq：{ data.qq }</span>
            <span>请假状态：{ data.status }</span>
          </div>
        );
      } else if (type == 'leave' && active == 2) {
        return (
          <div className="leaveDetail">
            <span>流水号： { data.id }</span>
            <span>姓名：{ data.name }</span>
            <span>工号：{ data.num }</span>
            <span>系别：{ data.department }</span>
            <span>开始时间：{ data.startTime }</span>
            <span>结束时间：{ data.endTime }</span>
            <span>创建时间：{ data.createTime }</span>
            <span>请假事由：{ data.reason }</span>
            <span>手机号：{ data.phone }</span>
            <span>请假状态：{ data.status }</span>
          </div>
        );
      } else if (type == 'attendance') {
        // 获取该课堂的所有信息
        getCourseInfo({
          course_id: data.id
        });

        return (
          <div className="leaveDetail">
            <span>课堂ID： { data.id }</span>
            <span>课堂名称：{ data.name }</span>
            <span>教师工号：{ data.num }</span>
            <span>学校：{ data.college }</span>
            <span>创建时间：{ data.createTime }</span>
            <span>上课地点：{ data.address }</span>
            <span>课堂状态：{ data.status }</span>
            <span>应到人数：{ courseInfo.shouldNum }</span>
            <span>实到人数：{ courseInfo.realNum }</span>
            <span>请假人数：{ courseInfo.askLeaveNum }</span>
            <span>迟到人数：{ courseInfo.lateNum }</span>
            <span>早退人数：{ courseInfo.leaveEarlyNum }</span>
            <span>旷课人数：{ courseInfo.truancyNum }</span>
          </div>
        );
      }
    }

    /**
     * 生成表头。
     * @author Tinybo
     * @date 2019 05 13
     * @memberof SelfTable
     */
    handleColumns = () => {
      let columns = '';
      if (this.props.type == 'attendance') {
        return [{
          title: '流水号',
          dataIndex: 'id',
          key: 'id',
          ...this.getColumnSearchProps('id'),
        }, {
          title: '课堂名',
          dataIndex: 'name',
          key: 'name',
          ...this.getColumnSearchProps('name'),
        }, {
          title: '教师名',
          dataIndex: 'teaName',
          key: 'teaName',
          ...this.getColumnSearchProps('teaName'),
        }, {
          title: '学校',
          dataIndex: 'college',
          key: 'college',
          ...this.getColumnSearchProps('college'),
        }, {
          title: '上课地点',
          dataIndex: 'address',
          key: 'address',
          ...this.getColumnSearchProps('address'),
        }, {
          title: '创建时间',
          dataIndex: 'createTime',
          key: 'createTime',
          ...this.getColumnSearchProps('createTime'),
        }, {
          title: '课堂状态',
          dataIndex: 'status',
          key: 'status',
          ...this.getColumnSearchProps('status'),
        }]
      }
      if (this.props.active == 1) {
        columns = [{
          title: '流水号',
          dataIndex: 'id',
          key: 'id',
          ...this.getColumnSearchProps('id'),
        }, {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
          ...this.getColumnSearchProps('name'),
        }, {
          title: '学号',
          dataIndex: 'num',
          key: 'num',
          ...this.getColumnSearchProps('num'),
        }, {
          title: '系别',
          dataIndex: 'department',
          key: 'department',
          ...this.getColumnSearchProps('department'),
        }, {
          title: '专业',
          dataIndex: 'major',
          key: 'major',
          ...this.getColumnSearchProps('major'),
        }, {
          title: '年级',
          dataIndex: 'grade',
          key: 'grade',
          ...this.getColumnSearchProps('grade'),
        }, {
          title: '班级',
          dataIndex: 'class',
          key: 'class',
          ...this.getColumnSearchProps('class'),
        }, {
          title: '请假事由',
          dataIndex: 'reason',
          width: '20%',
          key: 'reason',
          ...this.getColumnSearchProps('reason'),
        }, {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          ...this.getColumnSearchProps('status'),
        }];
      } else {
        columns = [{
          title: '流水号',
          dataIndex: 'id',
          key: 'id',
          ...this.getColumnSearchProps('id'),
        }, {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
          ...this.getColumnSearchProps('name'),
        }, {
          title: '工号',
          dataIndex: 'num',
          key: 'num',
          ...this.getColumnSearchProps('num'),
        }, {
          title: '系别',
          dataIndex: 'department',
          key: 'department',
          ...this.getColumnSearchProps('department'),
        }, {
          title: '开始时间',
          dataIndex: 'startTime',
          key: 'startTime',
          ...this.getColumnSearchProps('startTime'),
        }, {
          title: '结束时间',
          dataIndex: 'endTime',
          key: 'endTime',
          ...this.getColumnSearchProps('endTime'),
        }, {
          title: '请假事由',
          dataIndex: 'reason',
          key: 'reason',
          ...this.getColumnSearchProps('reason'),
        }, {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          ...this.getColumnSearchProps('status'),
        }];
      }

      return columns;
    }

    render () {
      return (
        <div className="tableContainer">
          <Table expandedRowRender={ this.showItem } columns={ this.handleColumns() } dataSource={this.props.dataSource} />
        </div>
      )
    }
}

export default SelfTable;