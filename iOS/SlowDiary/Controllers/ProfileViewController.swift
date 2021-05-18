//
//  ProfileViewController.swift
//  SlowDiary
//
//  Created by 박지현 on 2021/05/17.
//

import UIKit

class ProfileViewController: UIViewController, UITableViewDelegate, UITableViewDataSource {
    
    let changeImage = ["person.fill", "power"]
    let sections: [String] = ["정보수정", "로그아웃"]
    
    @IBOutlet var UIView: UIView!
    @IBOutlet public var Name: UILabel!
    @IBOutlet public var Check: UILabel!
    @IBOutlet public var School: UILabel!
    @IBOutlet var tableview: UITableView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        viewWillAppear(true)
        self.tableview.delegate = self
        self.tableview.dataSource = self
    }
    
    func numberOfSections(in tableView: UITableView) -> Int {
        return 2
    }
    
    func tableView(_ tableView: UITableView, titleForHeaderInSection section: Int) -> String? {
        return sections[section]
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 1
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "SettingCell", for: indexPath) as! SetTableViewCell
        
        if indexPath.section == 0 {
            cell.title.text = sections[indexPath.section]
            cell.icon.image = UIImage(systemName: changeImage[indexPath.section])
            cell.nextIcon.image = UIImage(systemName: "chevron.right")
        } else {
            cell.title.text = "로그아웃"
            cell.icon.image = UIImage(systemName: "power")
            cell.nextIcon.image = UIImage(systemName: "chevron.right")
        }
        
        return cell
    }

}
