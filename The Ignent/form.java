import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

import java.util.*;
import java.io.*;


class MyFrame
        extends JFrame
        implements ActionListener
{


    // Components of the Form
    private Container c;
    private JLabel title;
    private JLabel name;
    private JTextField tname;
    private JLabel mno;
    private JTextField tmno;
    private JLabel gender;
    private JRadioButton male;
    private JRadioButton female;
    private ButtonGroup gengp;
    private JLabel dob;
    private JComboBox Bg;
    private JComboBox Age;
    private JComboBox Weight;
    private JLabel add,add2;
    private JTextArea tadd,tadd2;
    private JCheckBox term;
    private JButton sub;
    private JButton reset;
    private JTextArea tout;
    private JLabel res;
    private JTextArea resadd;
    private  Graphics gg;

    private String bg[]
            = { "Select","A+","A-","B+","B-","AB+","AB-","O+","O-" };
    private String age[]
            = { "Select","0-5", "6-10", "11-16", "17-22",
            "23-28", "29-35", "36-42", "43-50",
            "51-60", "61-70", "71-80", "81-100" };
    private String weight[]
            = { "Select","2-5", "6-10", "11-20", "21-30",
            "31-40", "41-50", "51-60", "61-70",
            "71-80", "81-90", "91-100", "101-120","121-130","131-140","141-150"
             };

    // constructor, to initialize the components
    // with default values.
    public MyFrame()throws IOException
    {
        setTitle("eHealth Checkup");
        setBounds(70, 60, 1200, 600);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setResizable(true);

        c = getContentPane();
        c.setLayout(null);

        title = new JLabel("eHealth");
        title.setFont(new Font("Arial", Font.PLAIN, 30));
        title.setSize(300, 30);
        title.setLocation(500, 10);
        c.add(title);





        name = new JLabel("Name");
        name.setFont(new Font("Arial", Font.PLAIN, 20));
        name.setSize(100, 20);
        name.setLocation(40, 80);
        c.add(name);




        tname = new JTextField();
        tname.setFont(new Font("Arial", Font.PLAIN, 15));
        tname.setSize(190, 20);
        tname.setLocation(130, 80);
        c.add(tname);

        mno = new JLabel("Mobile");
        mno.setFont(new Font("Arial", Font.PLAIN, 20));
        mno.setSize(100, 20);
        mno.setLocation(40, 110);
        c.add(mno);

        tmno = new JTextField();
        tmno.setFont(new Font("Arial", Font.PLAIN, 15));
        tmno.setSize(150, 20);
        tmno.setLocation(130, 110);
        c.add(tmno);

        gender = new JLabel("Gender");
        gender.setFont(new Font("Arial", Font.PLAIN, 20));
        gender.setSize(100, 20);
        gender.setLocation(40, 140);
        c.add(gender);

        male = new JRadioButton("Male");
        male.setFont(new Font("Arial", Font.PLAIN, 15));
        male.setSelected(true);
        male.setSize(75, 20);
        male.setLocation(130, 140);
        c.add(male);

        female = new JRadioButton("Female");
        female.setFont(new Font("Arial", Font.PLAIN, 15));
        female.setSelected(false);
        female.setSize(80, 20);
        female.setLocation(210, 140);
        c.add(female);

        gengp = new ButtonGroup();
        gengp.add(male);
        gengp.add(female);

        dob = new JLabel("BG, AGE, WEIGHT");
        dob.setFont(new Font("Arial", Font.PLAIN, 18));
        dob.setSize(200, 20);
        dob.setLocation(40, 170);
        c.add(dob);

        Bg = new JComboBox(bg);
        Bg.setFont(new Font("Arial", Font.PLAIN, 15));
        Bg.setSize(60, 24);
        Bg.setLocation(200, 170);
        c.add(Bg);

        Age = new JComboBox(age);
        Age.setFont(new Font("Arial", Font.PLAIN, 14));
        Age.setSize(70, 24);
        Age.setLocation(260, 170);
        c.add(Age);

        Weight = new JComboBox(weight);
        Weight.setFont(new Font("Arial", Font.PLAIN, 14));
        Weight.setSize(76, 24);
        Weight.setLocation(330, 170);
        c.add(Weight);

        add = new JLabel("Urine Test");
        add.setFont(new Font("Arial", Font.PLAIN, 20));
        add.setSize(100, 20);
        add.setLocation(40, 210);
        c.add(add);

        tadd = new JTextArea();
        tadd.setFont(new Font("Arial", Font.PLAIN, 20));
        tadd.setSize(150, 20);
        tadd.setLocation(150, 210);
        tadd.setLineWrap(true);
        c.add(tadd);

        add2 = new JLabel("Lipid Profile Test");
        add2.setFont(new Font("Arial", Font.PLAIN, 20));
        add2.setSize(160, 20);
        add2.setLocation(40, 240);
        c.add(add2);

        tadd2 = new JTextArea();
        tadd2.setFont(new Font("Arial", Font.PLAIN, 20));
        tadd2.setSize(150, 20);
        tadd2.setLocation(200, 240);
        tadd2.setLineWrap(true);
        c.add(tadd2);

        add2 = new JLabel("Diabetes test");
        add2.setFont(new Font("Arial", Font.PLAIN, 20));
        add2.setSize(160, 20);
        add2.setLocation(40, 270);
        c.add(add2);

        tadd2 = new JTextArea();
        tadd2.setFont(new Font("Arial", Font.PLAIN, 20));
        tadd2.setSize(150, 20);
        tadd2.setLocation(200, 270);
        tadd2.setLineWrap(true);
        c.add(tadd2);

        term = new JCheckBox("Accept Terms And Conditions.");
        term.setFont(new Font("Arial", Font.PLAIN, 15));
        term.setSize(250, 20);
        term.setLocation(60, 460);
        c.add(term);

        sub = new JButton("Submit");
        sub.setFont(new Font("Arial", Font.PLAIN, 15));
        sub.setSize(100, 20);
        sub.setLocation(150, 500);
        sub.addActionListener(this);
        c.add(sub);

        reset = new JButton("Reset");
        reset.setFont(new Font("Arial", Font.PLAIN, 15));
        reset.setSize(100, 20);
        reset.setLocation(270, 500);
        reset.addActionListener(this);
        c.add(reset);

        tout = new JTextArea();
        tout.setFont(new Font("Arial", Font.PLAIN, 15));
        tout.setSize(300, 400);
        tout.setLocation(800, 100);
        tout.setLineWrap(true);
        tout.setEditable(false);
        c.add(tout);

        res = new JLabel("");
        res.setFont(new Font("Arial", Font.PLAIN, 20));
        res.setSize(500, 25);
        res.setLocation(800, 500);
        c.add(res);

        resadd = new JTextArea();
        resadd.setFont(new Font("Arial", Font.PLAIN, 15));
        resadd.setSize(200, 75);
        resadd.setLocation(800, 175);
        resadd.setLineWrap(true);
        c.add(resadd);

        setVisible(true);
    }


    // method actionPerformed()
    // to get the action performed
    // by the user and act accordingly
    public void actionPerformed(ActionEvent e)
    {
        if (e.getSource() == sub) {
            if (term.isSelected()) {
                String data1;
                String data
                        = "Name : "
                        + tname.getText() + "\n"
                        + "Mobile : "
                        + tmno.getText() + "\n";
                if (male.isSelected())
                    data1 = "Gender : Male"
                            + "\n";
                else
                    data1 = "Gender : Female"
                            + "\n";
                String data2
                        = "Blood Group : "
                        + (String)Bg.getSelectedItem()
                        + "\nAge : " + (String)Age.getSelectedItem()
                        + "\nWeight : " + (String)Weight.getSelectedItem()
                        + "\n";

                String data3 = "Urine Test : " + tadd.getText();
                tout.setText(data + data1 + data2 + data3);
                tout.setEditable(false);

                res.setText("Registration Successfully..");
            }
            else {
                tout.setText("");
                resadd.setText("");
                res.setText("Please accept the"
                        + " terms & conditions..");
            }
        }

        else if (e.getSource() == reset) {
            String def = "";
            tname.setText(def);
            tadd.setText(def);
            tadd2.setText(def);
            tmno.setText(def);
            res.setText(def);
            tout.setText(def);
            term.setSelected(false);
            Bg.setSelectedIndex(0);
            Age.setSelectedIndex(0);
            Weight.setSelectedIndex(0);
            resadd.setText(def);
        }
    }
}

// Driver Code
class Registration {

    public static void main(String[] args) throws IOException
    {


        MyFrame f = new MyFrame();

    }
}